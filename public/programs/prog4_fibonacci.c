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