# Exercises

## What to Learn From This Exercise
Today's exercise is going to be an introduction to sorting in C. As with all 
things in C this is both relatively simple, and potentially complex at the 
same time. Use documentation or the internet to get accurate descriptions 
of what each function does and how to use it. LLMs can also help with this,
but they often time have a hard time distinguishing between C and C++ 
functions so use them with caution.

## rand_arr
In my kindness, I've provided a very simple program 'rand_arr.c' that will
randomly generate an array of ints and prints them to stdout. Of note is a 
function for printing out an entire array in its current order. This will allow
you to print an array before and after sorting as a way of debugging its state.

## Task 1: Sorting the Array
In order to sort an array in C we need can use the stdlib function 
['qsort'](https://www.tutorialspoint.com/c_standard_library/c_function_qsort.htm).
Using the documentation, create two comparison functions, one to sort the array
into ascending order, and one descending. e.g. the array 4, 9, 2, 6 should be 
sorted into 2, 4, 6, 9 and 9, 6, 4, 2

## Task 2: Generating Random Structs
Add in the struct 'array_elem' with two different attributes, a and b:

    struct array_elem {
        int a;
        int b;
    };

Write some code that will randomly generate an array of array_elems. Each array
elem should have values for a and b between 1 and 100. You may wish to write a
quick print function to print your array of array_elems, or you can use GDB to
inspect the values at runtime to check you've implemented it correctly.

## Task 3: Sort the Array Again
Sort the array of array_elems into ascending order based on the values of a,
and then again based on the values of b.

## Task 4: Memory Management
Ensure you've freed any memory you've allocated correctly. You should use 
valgrind, or some equivalent to ensure this.

# Theory
Some questions to think about and discuss. You may not be able to come up with
a satisfying answer to each of these just yet, but consider them and the topics
we have already introduced in this course. What would be the relavant data to
gather and how might you go about doing so. These may be interesting topics to 
briefly discuss in your reports.

## Testing
Can you automate your testing of your solutions? What would be the interesting
edge cases and does your solution work in all of them? Which edge cases can you
ignore as they are unlikely to occur in practice?

## Speed
Is your solution as fast as it can be? Does it minimise the amount of 
operations the CPU performs? Does it use any clever logic to further minimise
the amount of operations? 

## Scalability
Does the performance of your solution alter as you change the amount of data
you are testing on? Does your solution become unfeasible past a certain point?
Consider the different parts of a computer such as the memory, the CPU, stdout,
and how each of these might place their own limits on your solution.

