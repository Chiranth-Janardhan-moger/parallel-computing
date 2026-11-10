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
