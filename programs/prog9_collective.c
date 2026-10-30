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