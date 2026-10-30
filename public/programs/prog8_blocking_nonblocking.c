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