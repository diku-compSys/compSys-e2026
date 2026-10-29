# Lecture plan for Computer Systems

<!-- |      | 02 Sep |       | TAs      | Master Class on Tools for the Working Programmer, 10:15 to 12:00              |        | -->

| Week | Date   | Topic | Lecture  | Topic                                                                         | Material |
| ---- | ----   | ----- | -------  | ------                                                                        | -------- |
| 36   | 31 Aug | Intro | David    | Course introduction                                                           | COD 1.1-1.4,1.6-1.8 |
|      |        | Basic | David    | Computers and C programming                                                   | JG 1-3 |
|      | 02 Sep | Basic | David    | Assembly code and machine model                                               | COD 2.1-2.4,2.6-2.7, JG 4 |
| 37   | 07 Sep | Basic | David    | Computer arithmetic                                                           | COD 3.1-3.3, 3.5 |
|      | 09 Sep | Basic | David    | Functions and text                                                            | COD 2.8-2.9, JG 5-7 |
| 38   | 14 Sep | Basic | David    | C Programming - pointers and memory                                           | JG 8-9, 11 |
|      | 16 Sep | Basic | David    | C Programming - dynamic memory and cache                                      | JG 12-13, COD 5.1-5.4 |
| 39   | 21 Sep | Basic | David    | Intro to Operating systems - kernel, processes, system calls                  | OSTEP 2,4,5 |
|      | 23 Sep | OS    | David    | Process Scheduling                                                            | OSTEP 7,8,9,10 |
|      |        |       |          | Hand-in A0                                                                    |          |
| 40   | 28 Sep | OS    | David    | Virtual memory - hardware perspective                                         | COD 5.7-5.8 |
|      | 30 Sep | OS    | David    | Virtual memory - OS perspective                                               | OSTEP 13,17 |
| 41   | 05 Oct | OS    | David    | Concurrency I                                                                 | COD 6.1-6.2, 6.4-6.5 and OSTEP 27 |
|      | 07 Oct | OS    | David    | Concurrency II                                                                | OSTEP 29,30 |
| 42   |        |       |          | Fall Vacation - No lectures                                                   |          |
| 43   | 19 Oct | CN    | David    | Introduction to Computer Networks                                             | KR 1.1 - 1.6 (Optional read - [Internet history](https://www.internetsociety.org/internet/history-internet/brief-history-internet/)) |
|      | 21 Oct | CN    | David    | Network Programming                                                           | BOH 11.4 (Optional read - [Beej's Guide to Network Programming](http://beej.us/guide/bgnet/) and BOH 11.1-11.3, 11.6) |
|      |        |       |          | Hand-in A1 (OS)                                                               |          |
| 44   | 26 Oct | CN    | David    | Non-Blocking Servers and Introduction to Security                             | BOH 12.1-12.3, KR 8.1, 8.2  |
|      | 28 Oct | CN    | David    | Network Applications: Application Design, Socket API, HTTP & Content Delivery | KR 2.1, 2.2, 2.3.1, 2.3.2, 2.6.1 - 2.6.3 |
| 45   | 02 Nov | CN    | David    | Application Layer: DNS + P2P File Distribution, Transport layer: UDP          | KR 2.4, 2.5, 3.1 - 3.3 |
|      | 04 Nov | CN    | David    | Transport layer: Principles of Reliable Data Transfer + TCP                   | KR 3.1 - 3.7 |
| 46   |        |       |          | Re-exam week - No lectures                                                    |          |
| 47   | 16 Nov | CN    | David    | Avoiding Deadlock                                                             | BOH 12.5-12.7 (Optional read - BOH 8.5-8.7) |
|      | 18 Nov | Arc   | Finn     | C to Assembler - A minimal RISC-V setup                                       | review material for lectures 4/9 + 9/9, slides will be available after lecture |
|      |        |       |          | Hand-in A3 (Network)                                                          |          |
| 48   | 23 Nov | Arc   | Finn     | RISC-V machine language                                                       | as above. Also get some familiarity/overview of ch 1,2 and 13 of [RISCV](https://github.com/riscv/riscv-isa-manual/releases/download/20240411/unpriv-isa-asciidoc.pdf) |
|      | 25 Nov | Arc   | Finn     | Digital logic                                                                 | COD A.1 - A.3, A.5, A7 - A.9, [NandGame](https://nandgame.com/) |
| 49   | 30 Nov | Arc   | Finn     | The simple machine                                                            | COD 4.1 - 4.4 |
|      | 02 Dec | Arc   | Finn     | Into to Mikroarchitektur: Pipelining and ydeevne                              | COD 4.6 - 4.9 + [note](https://github.com/diku-compSys/compSys-e2025/blob/main/resources/Afviklingsplot/plot.md), afsnit: intro,lange pipelines,superskalare |
| 50   | 07 Dec | Arc   | Finn     | Avanceret Mikroarchitektur I                                                  | COD 4.11 + [note](https://github.com/diku-compSys/compSys-e2025/blob/main/resources/Afviklingsplot/plot.md), afsnit om out-of-order |
|      | 09 Dec | Arc   | Finn     | Avanceret Mikroarchitektur II + Vector processing. Opsa2mling. Maskinnær optimering.                                                 | [note](https://github.com/diku-compSys/compSys-e2025/blob/main/resources/Afviklingsplot/plot.md), afsnit om out-of-order |
| 51   | 14 Dec | Other | Michael  | Christmas lecture.                                                            | None |
|      | 16 Dec |       |          | Cancelled                                                                     |  |
|      |        |       |          | Hand-in A4 (Architecture)                                                     |         |
| 52   |        |       |          | Christmas vacation - No lectures                                              |         |
| 53   |        |       |          | Christmas vacation - No lectures                                              |         |
| 1    | 04 Jan | CN    | Michael  | Network layer, data plane                                                     | KR 4.1 - 4.2.4, 4.3 (Optional read - [Design Philosophy of DARPA Internet Protocols](http://www.cs.princeton.edu/courses/archive/spr14/cos461/papers/clark88.pdf)) |
|      | 06 Jan | CN    | Michael  | Network layer, control plane                                                  | KR 5.1 - 5.3, KR 6.1 - 6.4.3, KR 8.5 - 8.6 |
| 2    | 11 Jan | CN    | Michael  | Security Across the Network                                                   | KR 8.1 - 8.7  |
|      | 13 Jan | Recap | TAs      | Architecture recap                                                            |         |
|      |        | Recap | TAs      | Operation System recap                                                        |         |
|      |        | Recap | TAs      | Computer Networks recap  			                                           |         |
| 3    | 22 Jan |       | Lectures | FAQ, Exam question session and evaluation 			                           |         |
| 4    | 27 Jan |       | Everyone | CompSys Exam                                                                  |         |


## Material

 - COD: Computer Organization and Design, RISC-V Edition: The Hardware Software Interface, David A. Hennessy and John L. Patterson, 2nd edition, Morgan Kaufmann, ISBN: 978-0128203316
 - KR: James F. Kurose, Keith W. Ross: Computer Networking: A Top-Down Approach International Edition, 8th and global edition
 - JG: Modern C, Jens Gustedt, Oct. 10, 2019, https://hal.inria.fr/hal-02383654/file/ModernC.pdf
 - OSTEP: Operating Systems: Three Easy Pieces, Remzi H. Arpaci-Dusseau and Andrea C. Arpaci-Dusseau. https://pages.cs.wisc.edu/~remzi/OSTEP/ 
 - BOH: Randal E. Bryant and David R. O'Hallaron. Computer Systems: A Programmers Perspective, 3rd and global edition (We will only use small sections of this book, provided as a pdf with the resources directory. Some additional optional reading is highlighted above for those with access to the full book)


