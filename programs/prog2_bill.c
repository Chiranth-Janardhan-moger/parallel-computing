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