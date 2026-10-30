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