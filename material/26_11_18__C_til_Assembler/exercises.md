# Exercises


## Exercises for lecture 18/11

NOTE: There may be too much here - if so, there'll be time to continue 23/11.

1. Get the 'C' examples and setup for cross compiling 

They are placed in our public repo in the "resources/tiny_riscv" directory.
Copy all files in that directory to where you want to work with them.

We're using tools on a server at DIKU to provide uniform setup to everybody,
so internet access is required.


2. Compile your first C program

Translate fib.c into a disassembled riscv format (.dis)
by running "make fib.dis". Look at the generated file and try to figure out, what's in it.


3. Earlier in the course you wrote your own fib function in riscv
assembly. Find your own code from back then and compare it to the
generated code. Alternately write it again.

4. In the Makefile different options are given to the cross compiler,
among them "-O1" - this yields a program that is reasonably fast while also
typically being relatively readable. By changing the option you can get
no optimization (-O0) or more optimization (-O2). Try generating riscv assembler
for each of these 3 optimization levels. Compare them against each other. 
Which is more readable? We can expect -O2 to be faster then the others. But how much
(guess) ?

5. Try to understand the minimal library in "lib.c"

Perhaps break it up and ask chatgpt to explain the fragments one by one.
Be critical.


6. Use the riscv simulator.

The simulator is an executable you need to run on your local computer.
Install 'git' if you haven't got it already and clone the course repository.
DO NOT merely download stuff using githubs webinterface. It will not work.

The simulators are in tools/riscv-sim, there is one for Linux, one for x86
based Macs and one for ARM based macs. If you are on windows, use WSL and
the simulator for Linux.

Use the simulator to run your 3 variants of fib and find out how many
instructions it takes to run each variant with the same input.
Check the source code in fib.c to discover how it gets its input.



7. Write your own C program

Try to use some of the facilities, for example input/output.
Note that there is no standard library. Only the functions defined in "lib.h"
is available.

Take a look at hello.c, fib.c, erat.c or echo.c for inspiration.

If you're really ambitious, try to build something which uses the dynamic memory
management as well (allocate/release).

When things go wrong it is insanely difficult to find out why.

 * You can use the logging facility to see how far in the execution you got.
 * Best approach to debugging is to put in print_string() calls at the right
   places in your program.


