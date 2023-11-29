# **CSARCH2-Simulator: 4-WAY BSA + FIFO**

1. Ducut, Ezekiel <br>
2. Fausto, Lorane <br>
3. Hidalgo, Francisco <br>
4. Villanueva, Nathan <br>

How to run:
Open the `index.html` file to run the program.

## **Website Link**: https://lowrainxx.github.io/CSARCH2-Simulation-Project/

## **Video Link**: https://youtu.be/sQSGaueX-Dg

## **Common Specifications**:
Total Number of cache blocks: 32 blocks <br>
Total sets: 8 sets <br>
Blocks per set: 4 blocks <br>
Cache line: 64 words <br>
Cache Access Time: 1ns <br>
Main memory access: 10ns <br>
Read policy: load-through <br>

## Analysis Write-up

### **Test-Case 1: Sequential Sequence**
This test requires 2n cache blocks which contain the sequence 0, 1, 2, 3, …, 2n-1 and repeated 4 times.

#### Final Cache Memory Snapshot
![tc1Snapshot](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/4971555a-f62d-468e-aa07-2b183d459efb)

#### Block Placement Tracing
The images below show the sequencing of blocks number 0-62. It is repeated 4 times as stated in the test case that is why 0-62 blocks are shown 4 times.

|                                     |                                     | 
| ----------------------------------- | ----------------------------------- |
| ![tc1bt1](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/53f9dcbe-cd63-4533-8b0e-8604f58cc452) | ![tc1bt2](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/040e1009-51cc-4ddd-b41f-20fa0fe12bd2) | 
| ![tc1bt3](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/a2fca472-51c2-4d03-b528-c63f7273077e) | ![tc1bt4](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/e9157ba3-f8cc-41e8-8e75-af135279923e) |

#### Statistics of the Test Case
In test case 1, there were 256 accesses in the main memory. 0 hits and 256 misses, this means that the algorithm didn’t detect blocks from the sequence that are already in the cache memory making its hit rate and miss rate 0% and 100% respectively. 

Average memory access time is 22ns and the total memory access time is 5632ns.

![tc1Stats](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/b101d3c1-420a-4eb7-9de4-a654dba4690e)

Cache Hit Rate = Cache Hit Count / Memory Access Count <br>
Cache Miss Rate = Cache Miss Count / Memory Access Count <br>
Miss Penalty = Cache Access Time + Memory Access Time * 2 + Cache Access Time <br>
Average Memory Access Time = Cache Hit Rate * Cache Access Time + Cache Miss Rate * Miss Penalty <br>
Total Memory Access Time = Memory Access Count * Average Memory Access Time <br>
Cache Access Time = 1ns <br>
Memory Access Time = 10ns <br>
Memory Access Count: 256 <br>
Hits: 0 <br>
Misses: 256 

Cache Hit Rate = 0 / 256 <br>
Cache Miss Rate = 256 / 256 <br>
Miss Penalty = 1 + 10 * 2 + 1 <br>
Average Memory Access Time = 0 * 1ns +1.000 * 22 <br>
Total Memory Access Time = 256 * 22ns 

**Summary**: <br>
The first 31 sequences of blocks are just placed in their designated cache blocks by getting its modulo and the number of sets available, in this case there are 8 sets. The next sequence fills all the blocks in the set. The purpose of this test case is to check if the blocks in the sequence is correctly being placed with the FIFO (First-In, First-Out) algorithm with 0 hits and 256 misses as there are no block number that are inside the cache block when placing the blocks in the sequence or no duplicates inside the cache block.

### **Test Case 2: Random Sequence**
Test case 2 necessitates a sequence comprising 4n cache blocks, where n is set to 32. The test involves using a random sequence of values ranging from 0 to 127.

#### Final Cache Memory Snapshot
![tc2snapshot](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/9b614f38-2c3d-4f2f-a867-730f2f6e1d3e)

#### Block Placement Tracing
The images below show the sequencing for the random values ranging from 0 to 127. The test case algorithm has 4n cache blocks wherein n is 32 cache blocks based on the specifications. 

|                                     |                                     | 
| ----------------------------------- | ----------------------------------- |
| ![tc2bt1](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/2e926f58-eb99-4693-a10e-0d1ab08bd74f) | ![tc2bt2](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/d7c9d5c8-2aec-4966-8d0f-959363e0c636) | 
| ![tc2bt3](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/0f895e55-0b2b-4f16-be66-21e5d1c90414) | ![tc2bt4](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/e2c73c03-6138-4a65-a475-10a28e1db177) |

#### Statistics of the Test Case
In this test case, there were 128 main memory accesses, with 24 blocks being hit and 104 blocks being missed. Therefore, the rates of hits and misses were calculated as 19% and 81%, respectively. The hits occurred because there were duplicate values that hit each other during the sequence, causing the previously stored value to collide with the repeated one thus being replaced with its latest duplicate.

The average memory access time is 18.0625ns and the total memory access time is 2312ns.

![tc2stats](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/93ceb3cd-acb5-4d29-8431-1765e0c72fd2)

Cache Hit Rate = Cache Hit Count / Memory Access Count <br>
Cache Miss Rate = Cache Miss Count / Memory Access Count <br>
Miss Penalty = Cache Access Time + Memory Access Time * 2 + Cache Access Time <br>
Average Memory Access Time = Cache Hit Rate * Cache Access Time + Cache Miss Rate * Miss Penalty <br>
Total Memory Access Time = Memory Access Count * Average Memory Access Time <br>
Cache Access Time = 1ns <br>
Memory Access Time = 10ns <br>
Memory Access Count: 128 <br>
Hits: 24 <br>
Misses: 104 

Cache Hit Rate = 24 / 128 <br>
Cache Miss Rate = 104 / 128 <br>
Miss Penalty = 1 + 10 * 2 + 1 <br>
Average Memory Access Time = 0.1875 * 1ns +0.8125 * 22 <br>
Total Memory Access Time = 128 * 18.0625

**Summary**: <br>
The algorithm iterates through each randomly generated value, allocating it to its corresponding block by employing the modulo operation with the value and the number of sets. As the sets reach capacity, the First-In-First-Out (FIFO) replacement algorithm retrieves the most recently inputted value and substitutes it with the new one, signaling whether it constitutes a hit or miss in the process.

### **Test Case 3: Mid-Repeat Blocks**
This test case is similar to the first case, but the difference is that the middle part is repeated up to n-1 twice, where n is the number of cache blocks. From this, the hits are caused by the repeated sequences in the middle part. The image below shows the final cache memory that consists of the sequences 32 to 63, which completely fills the 32 cache blocks given in the specification. 

#### Final Cache Memory Snapshot
![tc3snapshot](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/b3b2a71b-752f-42df-bcb2-125e5a64cfa9)

#### Block Placement Tracing
The images below show the sequencing for the first loop of a mid-repeat algorithm. In mid-repeat, the sequence starts with 0, then proceeds with the middle part two times up to n-1 (where n is the number of cache blocks. The given number of cache blocks in the specifications is 32, therefore stopping at 30 when using 0-addressing. Then, it continues the remaining sequence up to 2n, stopping at 63. Lastly, these steps are repeated 3 more times.

|                                     |                                     | 
| ----------------------------------- | ----------------------------------- |
| ![tc3bt1](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/f2d49e93-e55d-47c2-9e96-6d47f6fa1631) | ![tc3bt2](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/eac78295-a284-4412-b8a1-04396daa0d16) | 
| ![tc3bt3](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/266b1b5c-95b9-473f-b4b3-899fd3b6dec9) | ![tc3bt4](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/fbfabcd9-49a5-461c-b083-4c647b8a53ac) |
| ![tc3bt5](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/747b34f2-7b7e-4f27-bf1f-6c22dbeacd33) | ![tc3bt6](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/bfcdd259-2566-4040-85c5-5781b4d89ba6) |
| ![tc3bt7](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/c98652c5-cc0f-41d4-a8b4-5815bbb0a0ec) | ![tc3bt8](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/63c53466-cf5d-41d4-8f50-dc3d08fbdf1e) |

#### Statistics of the Test Case
In this test case, there were 376 main memory accesses, with 120 blocks being hit and 256 blocks being missed. Therefore, the rates of hits and misses were calculated as 32% and 68%, respectively. The hits occurred because the middle part was repeated twice, causing the previously stored middle part to collide with the repeated one.

The average memory access time is 15.2979ns and the total memory access time is 5752ns.

![tc3stats](https://github.com/lowrainxx/CSARCH2-Simulation-Project/assets/87628691/22ec7333-e668-4fde-91ea-2799d2fbdc74)

Cache Hit Rate = Cache Hit Count / Memory Access Count <br>
Cache Miss Rate = Cache Miss Count / Memory Access Count <br>
Miss Penalty = Cache Access Time + Memory Access Time * 2 + Cache Access Time <br>
Average Memory Access Time = Cache Hit Rate * Cache Access Time + Cache Miss Rate * Miss Penalty <br>
Total Memory Access Time = Memory Access Count * Average Memory Access Time <br>
Cache Access Time = 1ns <br>
Memory Access Time = 10ns <br>
Memory Access Count: 376 <br>
Hits: 120 <br>
Misses: 256

Cache Hit Rate = 120 / 376 <br>
Cache Miss Rate = 256 / 376 <br>
Miss Penalty = 1 + 10 * 2 + 1 <br>
Average Memory Access Time = 0.3191 * 1ns + 0.6809 * 22 <br>
Total Memory Access Time = 376 * 15.2979ns

**Summary**: <br>
The algorithm sequentially processes randomly generated values, assigning each to a specific block using the modulo operation with the value and the set count. When sets become full, the First-In-First-Out (FIFO) replacement strategy replaces the oldest inputted value with the new one, indicating whether it results in a hit or miss during the operation. In the given algorithm, the hits happen in the repeating part of the sequence. 

<br> <br>
