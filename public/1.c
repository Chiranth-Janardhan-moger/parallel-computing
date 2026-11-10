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
