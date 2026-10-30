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