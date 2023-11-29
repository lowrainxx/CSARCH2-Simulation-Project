# CSARCH2-Simulator: 4-WAY BSA + FIFO

1. Ducut, Ezekiel

2. Fausto, Lorane
   
3. Hidalgo, Francisco
   
4. Villanueva, Nathan

How to run:
Open the `index.html` file to run the program.

# Website Link: https://lowrainxx.github.io/CSARCH2-Simulation-Project/

# Video Link: https://youtu.be/sQSGaueX-Dg

## Common Specifications:
Total Number of cache blocks: 32 blocks

Total sets: 8 sets

Blocks per set: 4 blocks

Cache line: 64 words

Cache Access Time: 1ns

Main memory access: 10ns

Read policy: load-through

## Analysis Write-up

### Test-Case 1: Sequential Sequence
This test requires 2n cache blocks which contain the sequence 0, 1, 2, 3, …, 2n-1 and repeated 4 times.

#### Final Cache Memory Snapshot
![tc1Snapshot](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/4971555a-f62d-468e-aa07-2b183d459efb)

#### Block Placement Tracing
|                                     |                                     | 
| ----------------------------------- | ----------------------------------- |
| ![tc1bt1](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/53f9dcbe-cd63-4533-8b0e-8604f58cc452) | ![tc1bt2](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/040e1009-51cc-4ddd-b41f-20fa0fe12bd2) | 
| ![tc1bt3](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/a2fca472-51c2-4d03-b528-c63f7273077e) | ![tc1bt4](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/e9157ba3-f8cc-41e8-8e75-af135279923e) |

#### Statistics of the Test Case
![tc1Stats](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/b101d3c1-420a-4eb7-9de4-a654dba4690e)

ADD CONCLU HERE

### Test Case 2: Random Sequence

#### Final Cache Memory Snapshot

#### Block Placement Tracing
|                                     |                                     | 
| ----------------------------------- | ----------------------------------- |
| INSERT IMAGE HERE | ADD MORE ROWS IF NECESSARY | 

#### Statistics of the Test Case

### Test Case 3: Mid-Repeat Blocks

#### Final Cache Memory Snapshot

#### Block Placement Tracing
|                                     |                                     | 
| ----------------------------------- | ----------------------------------- |
| INSERT IMAGE HERE | ADD MORE ROWS IF NECESSARY | 

#### Statistics of the Test Case
