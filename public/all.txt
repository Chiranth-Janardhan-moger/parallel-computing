/* ====================================================================
   PARALLEL COMPUTING LABORATORY (BCSL706)
   Complete OpenMP & MPI Programs Reference
   ==================================================================== */

/* ====================================================================
   PROGRAM 01: Matrix-Vector Multiplication using OpenMP PARALLEL directive
   Technology:  OpenMP
   File:        prog1_matvec.c
   Compilation: gcc -fopenmp prog1_matvec.c -o prog1_matvec
   Execution:   ./prog1_matvec
   ==================================================================== */

#include <stdio.h> 
#include <omp.h> 
  
#define N 4 
  
int main() { 
    int A[N][N] = {{1,2,3,4}, 
                   {5,6,7,8}, 
                   {9,10,11,12}, 
                   {13,14,15,16}}; 
    int x[N] = {1, 2, 3, 4}; 
    int y[N] = {0}; 
    int i, j; 
  
    #pragma omp parallel for private(j) shared(A, x, y) 
    for (i = 0; i < N; i++) { 
        int sum = 0; 
        for (j = 0; j < N; j++) { 
            sum += A[i][j] * x[j]; 
        } 
        y[i] = sum; 
        printf("Thread %d computed y[%d] = %d\n", 
               omp_get_thread_num(), i, y[i]); 
    } 
  
    printf("\nResultant vector y = A.x :\n"); 
    for (i = 0; i < N; i++) 
        printf("y[%d] = %d\n", i, y[i]); 
  
    return 0; 
}


/* ====================================================================
   PROGRAM 02: Parallel Supermarket Bill Processing using OpenMP Sections
   Technology:  OpenMP
   File:        prog2_bill.c
   Compilation: gcc -fopenmp prog2_bill.c -o prog2_bill
   Execution:   ./prog2_bill
   ==================================================================== */

#include <stdio.h> 
#include <omp.h> 
  
int main() { 
    float clothing[]   = {1200.50, 799.00, 450.75}; 
    float gaming[]      = {2500.00, 1500.00}; 
    float grocery[]     = {120.50, 85.25, 40.00, 60.75}; 
    float stationary[]  = {30.00, 45.50}; 
  
    int n_clothing = 3, n_gaming = 2, n_grocery = 4, n_stationary = 2; 
    float bill_clothing = 0, bill_gaming = 0; 
    float bill_grocery = 0, bill_stationary = 0, total = 0; 
  
    #pragma omp parallel sections 
    { 
        #pragma omp section 
        { 
            for (int i = 0; i < n_clothing; i++) 
                bill_clothing += clothing[i]; 
            printf("Thread %d -> Clothing total  = %.2f\n", 
                   omp_get_thread_num(), bill_clothing); 
        } 
  
        #pragma omp section 
        { 
            for (int i = 0; i < n_gaming; i++) 
                bill_gaming += gaming[i]; 
            printf("Thread %d -> Gaming total    = %.2f\n", 
                   omp_get_thread_num(), bill_gaming); 
        } 
  
        #pragma omp section 
        { 
            for (int i = 0; i < n_grocery; i++) 
                bill_grocery += grocery[i]; 
            printf("Thread %d -> Grocery total   = %.2f\n", 
                   omp_get_thread_num(), bill_grocery); 
        } 
  
        #pragma omp section 
        { 
            for (int i = 0; i < n_stationary; i++) 
                bill_stationary += stationary[i]; 
            printf("Thread %d -> Stationary total= %.2f\n", 
                   omp_get_thread_num(), bill_stationary); 
        } 
    } 
  
    total = bill_clothing + bill_gaming + bill_grocery + bill_stationary; 
    printf("\nFinal amount to be paid = %.2f\n", total); 
  
    return 0; 
}


/* ====================================================================
   PROGRAM 03: Computing the value of Pi by Numerical Integration using OpenMP
   Technology:  OpenMP
   File:        prog3_pi.c
   Compilation: gcc -fopenmp prog3_pi.c -o prog3_pi
   Execution:   ./prog3_pi
   ==================================================================== */

#include <stdio.h> 
#include <omp.h> 
  
static long num_steps = 100000; 
double step; 
  
int main() { 
    int i; 
    double x, pi, sum = 0.0; 
    step = 1.0 / (double) num_steps; 
  
    double start = omp_get_wtime(); 
  
    #pragma omp parallel for private(x) reduction(+:sum) 
    for (i = 0; i < num_steps; i++) { 
        x = (i + 0.5) * step; 
        sum += 4.0 / (1.0 + x * x); 
    } 
  
    pi = step * sum; 
    double end = omp_get_wtime(); 
  
    printf("Number of steps   = %ld\n", num_steps); 
    printf("Threads used      = %d\n", omp_get_max_threads()); 
    printf("Computed value of Pi = %.10f\n", pi); 
    printf("Time taken         = %f seconds\n", end - start); 
  
    return 0; 
}


/* ====================================================================
   PROGRAM 04: Multi-threaded Fibonacci Series Generation and Printing (Producer-Consumer)
   Technology:  OpenMP
   File:        prog4_fibonacci.c
   Compilation: gcc -fopenmp prog4_fibonacci.c -o prog4_fibonacci
   Execution:   ./prog4_fibonacci
   ==================================================================== */

#include <stdio.h> 
#include <omp.h> 
  
#define LIMIT 10 
  
long fib[LIMIT]; 
int produced = 0;      /* count of numbers generated so far   */ 
int consumed = 0;      /* count of numbers printed so far     */ 
omp_lock_t lock; 
  
void generate() { 
    long a = 0, b = 1, next; 
    for (int i = 0; i < LIMIT; i++) { 
        if (i == 0) next = a; 
        else if (i == 1) next = b; 
        else { next = a + b; a = b; b = next; } 
  
        omp_set_lock(&lock); 
        fib[i] = next; 
        produced++; 
        omp_unset_lock(&lock); 
  
        printf("[Generator - Thread %d] Generated fib[%d] = %ld\n", 
               omp_get_thread_num(), i, next); 
    } 
} 
  
void print_numbers() { 
    int i = 0; 
    while (i < LIMIT) { 
        omp_set_lock(&lock); 
        if (produced > consumed) { 
            printf("\t\t[Printer - Thread %d] Printed  fib[%d] = %ld\n", 
                   omp_get_thread_num(), i, fib[i]); 
            consumed++; 
            i++; 
        } 
        omp_unset_lock(&lock); 
    } 
} 
  
int main() { 
    omp_init_lock(&lock); 
  
    #pragma omp parallel sections num_threads(2) 
    { 
        #pragma omp section 
        generate(); 
  
        #pragma omp section 
        print_numbers(); 
    } 
  
    omp_destroy_lock(&lock); 
    return 0; 
}


/* ====================================================================
   PROGRAM 05: Finding the Student with the Highest CGPA (Gold Medal) using OpenMP
   Technology:  OpenMP
   File:        prog5_cgpa.c
   Compilation: gcc -fopenmp prog5_cgpa.c -o prog5_cgpa
   Execution:   ./prog5_cgpa
   ==================================================================== */

#include <stdio.h> 
#include <omp.h> 
  
#define N 6 
  
int main() { 
    char *names[N] = {"Ananya", "Bharath", "Chetan", 
                       "Divya", "Esha", "Farhan"}; 
    float cgpa[N]   = {8.7, 9.2, 8.9, 9.5, 9.1, 8.4}; 
  
    float max_cgpa = 0.0; 
    int topper = -1; 
  
    #pragma omp parallel 
    { 
        float local_max = 0.0; 
        int local_index = -1; 
        int id = omp_get_thread_num(); 
  
        #pragma omp for 
        for (int i = 0; i < N; i++) { 
            if (cgpa[i] > local_max) { 
                local_max = cgpa[i]; 
                local_index = i; 
            } 
        } 
  
        #pragma omp critical 
        { 
            printf("Thread %d: local highest CGPA = %.2f (%s)\n", 
                   id, local_max, 
                   local_index >= 0 ? names[local_index] : "None"); 
            if (local_max > max_cgpa) { 
                max_cgpa = local_max; 
                topper = local_index; 
            } 
        } 
    } 
  
    printf("\nGold Medalist: %s with CGPA = %.2f\n", 
           names[topper], max_cgpa); 
  
    return 0; 
}


/* ====================================================================
   PROGRAM 06: Square Matrix Multiplication: Sequential vs Parallel (OpenMP) Performance Comparison
   Technology:  OpenMP
   File:        prog6_matmul.c
   Compilation: gcc -fopenmp prog6_matmul.c -o prog6_matmul
   Execution:   ./prog6_matmul
   ==================================================================== */

#include <stdio.h> 
#include <stdlib.h> 
#include <omp.h> 
  
#define N 500   /* change to 1000 / 2000 / 3000 as required */ 
  
void fill_matrix(int **M) { 
    for (int i = 0; i < N; i++) 
        for (int j = 0; j < N; j++) 
            M[i][j] = rand() % 10; 
} 
  
int main() { 
    int **A = malloc(N * sizeof(int *)); 
    int **B = malloc(N * sizeof(int *)); 
    int **C_seq = malloc(N * sizeof(int *)); 
    int **C_par = malloc(N * sizeof(int *)); 
  
    for (int i = 0; i < N; i++) { 
        A[i]     = malloc(N * sizeof(int)); 
        B[i]     = malloc(N * sizeof(int)); 
        C_seq[i] = malloc(N * sizeof(int)); 
        C_par[i] = malloc(N * sizeof(int)); 
    } 
  
    fill_matrix(A); 
    fill_matrix(B); 
  
    /* ---------- Sequential ---------- */ 
    double t1 = omp_get_wtime(); 
    for (int i = 0; i < N; i++) 
        for (int j = 0; j < N; j++) { 
            int sum = 0; 
            for (int k = 0; k < N; k++) 
                sum += A[i][k] * B[k][j]; 
            C_seq[i][j] = sum; 
        } 
    double t2 = omp_get_wtime(); 
  
    /* ---------- Parallel (OpenMP) ---------- */ 
    double t3 = omp_get_wtime(); 
    #pragma omp parallel for collapse(2) 
    for (int i = 0; i < N; i++) 
        for (int j = 0; j < N; j++) { 
            int sum = 0; 
            for (int k = 0; k < N; k++) 
                sum += A[i][k] * B[k][j]; 
            C_par[i][j] = sum; 
        } 
    double t4 = omp_get_wtime(); 
  
    printf("Matrix size        : %d x %d\n", N, N); 
    printf("Sequential time     : %f seconds\n", t2 - t1); 
    printf("Parallel time       : %f seconds (threads = %d)\n", 
           t4 - t3, omp_get_max_threads()); 
    printf("Speedup             : %.2fx\n", (t2 - t1) / (t4 - t3)); 
  
    return 0; 
}


/* ====================================================================
   PROGRAM 07: Total Mangoes Picked by N Robots using MPI
   Technology:  MPI
   File:        prog7_mangoes.c
   Compilation: mpicc prog7_mangoes.c -o prog7_mangoes
   Execution:   mpirun -np 4 ./prog7_mangoes
   ==================================================================== */

#include <stdio.h> 
#include <stdlib.h> 
#include <time.h> 
#include <mpi.h> 
  
int main(int argc, char *argv[]) { 
    int rank, size; 
  
    MPI_Init(&argc, &argv); 
    MPI_Comm_rank(MPI_COMM_WORLD, &rank); 
    MPI_Comm_size(MPI_COMM_WORLD, &size); 
  
    srand(time(NULL) + rank); 
    int mangoes_picked = rand() % 20 + 1;   /* each robot: 1-20 mangoes */ 
  
    printf("Robot %d picked %d mangoes\n", rank, mangoes_picked); 
  
    int total = 0; 
    MPI_Reduce(&mangoes_picked, &total, 1, MPI_INT, MPI_SUM, 
               0, MPI_COMM_WORLD); 
  
    if (rank == 0) 
        printf("\nTotal mangoes picked by all %d robots = %d\n", 
               size, total); 
  
    MPI_Finalize(); 
    return 0; 
}


/* ====================================================================
   PROGRAM 08: MPI Program using Blocking and Non-Blocking Send/Receive
   Technology:  MPI
   File:        prog8_blocking_nonblocking.c
   Compilation: mpicc prog8_blocking_nonblocking.c -o prog8_blocking_nonblocking
   Execution:   mpirun -np 2 ./prog8_blocking_nonblocking
   ==================================================================== */

#include <stdio.h> 
#include <mpi.h> 
  
int main(int argc, char *argv[]) { 
    int rank, size; 
  
    MPI_Init(&argc, &argv); 
    MPI_Comm_rank(MPI_COMM_WORLD, &rank); 
    MPI_Comm_size(MPI_COMM_WORLD, &size); 
  
    if (size < 2) { 
        if (rank == 0) 
            printf("This program needs at least 2 processes.\n"); 
        MPI_Finalize(); 
        return 0; 
    } 
  
    int blocking_msg = 100, nonblocking_msg = 200; 
    int recv_blocking, recv_nonblocking; 
    MPI_Status status; 
    MPI_Request request; 
  
    /* ---------------- Blocking communication ---------------- */ 
    if (rank == 0) { 
        MPI_Send(&blocking_msg, 1, MPI_INT, 1, 0, MPI_COMM_WORLD); 
        printf("Process 0: sent %d using BLOCKING send\n", blocking_msg); 
    } else if (rank == 1) { 
        MPI_Recv(&recv_blocking, 1, MPI_INT, 0, 0, MPI_COMM_WORLD, &status); 
        printf("Process 1: received %d using BLOCKING receive\n", 
               recv_blocking); 
    } 
  
    MPI_Barrier(MPI_COMM_WORLD); 
  
    /* -------------- Non-blocking communication --------------- */ 
    if (rank == 0) { 
        MPI_Isend(&nonblocking_msg, 1, MPI_INT, 1, 1, 
                  MPI_COMM_WORLD, &request); 
        printf("Process 0: sent %d using NON-BLOCKING send\n", 
               nonblocking_msg); 
        MPI_Wait(&request, &status); 
    } else if (rank == 1) { 
        MPI_Irecv(&recv_nonblocking, 1, MPI_INT, 0, 1, 
                  MPI_COMM_WORLD, &request); 
        MPI_Wait(&request, &status); 
        printf("Process 1: received %d using NON-BLOCKING receive\n", 
               recv_nonblocking); 
    } 
  
    MPI_Finalize(); 
    return 0; 
}


/* ====================================================================
   PROGRAM 09: MPI Collective Communication (Broadcast, Scatter, Gather, Reduce)
   Technology:  MPI
   File:        prog9_collective.c
   Compilation: mpicc prog9_collective.c -o prog9_collective
   Execution:   mpirun -np 4 ./prog9_collective
   ==================================================================== */

#include <stdio.h> 
#include <mpi.h> 
  
int main(int argc, char *argv[]) { 
    int rank, size; 
  
    MPI_Init(&argc, &argv); 
    MPI_Comm_rank(MPI_COMM_WORLD, &rank); 
    MPI_Comm_size(MPI_COMM_WORLD, &size); 
  
    /* ---------------- Broadcast ---------------- */ 
    int data; 
    if (rank == 0) data = 55; 
    MPI_Bcast(&data, 1, MPI_INT, 0, MPI_COMM_WORLD); 
    printf("Process %d received broadcast data = %d\n", rank, data); 
    MPI_Barrier(MPI_COMM_WORLD); 
  
    /* ---------------- Scatter ---------------- */ 
    /* assumes program is run with exactly 4 processes */ 
    int scatter_data[4] = {10, 20, 30, 40}; 
    int recv_val; 
    MPI_Scatter(scatter_data, 1, MPI_INT, &recv_val, 1, MPI_INT, 
                0, MPI_COMM_WORLD); 
    printf("Process %d received scattered value = %d\n", rank, recv_val); 
    MPI_Barrier(MPI_COMM_WORLD); 
  
    /* ---------------- Gather ---------------- */ 
    int gathered[4]; 
    int my_value = (rank + 1) * 100; 
    MPI_Gather(&my_value, 1, MPI_INT, gathered, 1, MPI_INT, 
               0, MPI_COMM_WORLD); 
    if (rank == 0) { 
        printf("Process 0 gathered values : "); 
        for (int i = 0; i < size; i++) printf("%d ", gathered[i]); 
        printf("\n"); 
    } 
    MPI_Barrier(MPI_COMM_WORLD); 
  
    /* ---------------- Reduce ---------------- */ 
    int sum; 
    MPI_Reduce(&my_value, &sum, 1, MPI_INT, MPI_SUM, 0, MPI_COMM_WORLD); 
    if (rank == 0) 
        printf("Process 0: sum of all values (Reduce) = %d\n", sum); 
  
    MPI_Finalize(); 
    return 0; 
}
