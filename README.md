# Parallel Computing Laboratory (BCSL706)

Interactive web portal and reference manual for the Parallel Computing Laboratory course (BCSL706) under the CBCS 2022 Scheme for Semester VII B.E. Computer Science and Engineering, BMS Institute of Technology and Management (Autonomous Institute under VTU).

## Course Overview

- Course Code: BCSL706
- Credits: 1 (L:T:P:S: 0:0:1:0)
- CIE Marks: 50
- SEE Marks: 50
- Examination Duration: 3 Hours

## Program Index

| Program | Title | Technology | Source File | Compile Command |
|---|---|---|---|---|
| 1 | Matrix-Vector Multiplication using OpenMP PARALLEL directive | OpenMP | `prog1_matvec.c` | `gcc -fopenmp prog1_matvec.c -o prog1_matvec` |
| 2 | Parallel Supermarket Bill Processing using OpenMP Sections | OpenMP | `prog2_bill.c` | `gcc -fopenmp prog2_bill.c -o prog2_bill` |
| 3 | Computing the value of Pi by Numerical Integration using OpenMP | OpenMP | `prog3_pi.c` | `gcc -fopenmp prog3_pi.c -o prog3_pi` |
| 4 | Multi-threaded Fibonacci Series Generation and Printing (Producer-Consumer) | OpenMP | `prog4_fibonacci.c` | `gcc -fopenmp prog4_fibonacci.c -o prog4_fibonacci` |
| 5 | Finding the Student with the Highest CGPA (Gold Medal) using OpenMP | OpenMP | `prog5_cgpa.c` | `gcc -fopenmp prog5_cgpa.c -o prog5_cgpa` |
| 6 | Square Matrix Multiplication: Sequential vs Parallel (OpenMP) Performance Comparison | OpenMP | `prog6_matmul.c` | `gcc -fopenmp prog6_matmul.c -o prog6_matmul` |
| 7 | Total Mangoes Picked by N Robots using MPI | MPI | `prog7_mangoes.c` | `mpicc prog7_mangoes.c -o prog7_mangoes` |
| 8 | MPI Program using Blocking and Non-Blocking Send/Receive | MPI | `prog8_blocking_nonblocking.c` | `mpicc prog8_blocking_nonblocking.c -o prog8_blocking_nonblocking` |
| 9 | MPI Collective Communication (Broadcast, Scatter, Gather, Reduce) | MPI | `prog9_collective.c` | `mpicc prog9_collective.c -o prog9_collective` |

## Lab Environment Setup

All programs in this repository are written in C and are meant to be compiled and executed on a Linux terminal (Ubuntu / WSL2 / VM).

### 1. Install GCC and OpenMP Support

OpenMP support is bundled with GCC on Ubuntu via `build-essential`:

```bash
sudo apt update
sudo apt install build-essential
```

### 2. Install MPI Implementation

Install OpenMPI runtime and developer packages:

```bash
sudo apt install openmpi-bin libopenmpi-dev
```

*(Alternatively, MPICH can be installed via `sudo apt install mpich`)*

### 3. Verify Installation

```bash
gcc --version
mpicc --version
mpirun --version
```

### 4. Setup Working Directory

```bash
mkdir ~/BCSL706_ParallelComputingLab
cd ~/BCSL706_ParallelComputingLab
```

### 5. Compilation and Execution Patterns

- OpenMP Programs:
  ```bash
  gcc -fopenmp <filename>.c -o <output_name>
  ./<output_name>
  ```

- MPI Programs:
  ```bash
  mpicc <filename>.c -o <output_name>
  mpirun -np 4 ./<output_name>
  ```

Note: If `mpirun` flags insufficient physical cores, pass `--oversubscribe`:
```bash
mpirun --oversubscribe -np 4 ./<output_name>
```

## Running the Web Application Locally

Requirements: Node.js 18+ and npm.

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
