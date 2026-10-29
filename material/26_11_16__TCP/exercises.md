# Managing Large File Requests and File Management
This exercise will continue our guidance through the A2 assignment. It 
presupposes that you have completed the subtasks described in the previous
exercises. You will also need to consult the handout for A2 for technical 
descriptions of the protocol and system as a whole.

Note, you do not need to follow this guide if you have your own ideas about 
how to solve A3. Additionally, this is not intended as a complete guide to 
every line you will need to write. It will describe much of the general 
structure and provide some specific functions as assistance, but you will need
to flesh out the bones provided here.

Finally, do note that not all of the tasks described in these guides are 
equal. Some will take considerably longer than others and so if you finish 
these all very quickly feel free to move on to the next ahead of time. 

## 14: Generate Multi-block Responses
We're on the home stretch now, almost done. We've already implemented all of 
the basic functionality, but now we need to consider files that are too large 
to fit into single messages. The requests themselves do not need to be 
modified as they're still just a request for a single file, so instead we 
should look back at how we generate response to those requests.

Here out basic logic is that any time we assemble a reply we should make a 
decision on how many blocks we need to actually send. The amount of blocks can 
be trivially calculated by dividing the total length, by the maximum size of 
each block. Do note the blocks in this system have been given a max length of 
8196 bytes, as given by the _MAX_MSG_LEN_ variable in common.h. This will 
include the header however, so the maximum payload will actually be lower than 
this. 

Once you've calculated how many blocks there are you just need to loop through 
creating them. You can probably use most of the logic you've previously 
created for the small files, but with some slight tweaks to more accurately 
set the _block_count_ attribute and so on in each header. Note that the last 
block probably does not have the same length as the rest, as its total 
capacity will probably not be filled. You should update its size 
appropriately. Also note that the python peer randomises the blocks before 
sending. You do not need to do this, but it might help your debugging if you 
do so.

## 15: Handle Multi-block Replies
Now it's the turn of handling multi-block files. Really this could be any sort 
of message, including a response to the initial register message if we have an 
especially large network. Therefore you should make sure this handling is in 
both, even though the only example we will discuss is larger files as that is 
easier to test. 

The initial response reading logic can remain the same, read a header and 
respond to that. In this case the thing to check is the _block_count_ 
attribute, as that will tell us how many blocks we are expecting. We should 
read them all within the same connection, so do not close it until we have 
finished reading them all. Remember to validate for consistent states between 
the blocks. For instance, that all blocks report the same _block_count_ or 
_total_hash_.

You must also account for blocks coming out of order. Once you have read the 
first message to arrive, you can actually make a calculation of the maximum 
amount of data you are about to receive. You now need to decided what you're 
doing with that data. One option is to malloc a data structure to store all 
this data in memory. This is more robust, as it allows multiple different 
message sizes as each index in your data structure would presumably be a 
pointer to location where you store the actual block. You can then just write 
each block to the appropriate index to end up with a nice, in order data 
structure that you can eventually write to a file. The downside of this is 
that you need to store the entire file in memory, which would be fine for a 
file like hamlet.txt, but maybe not if you were downloading something TB in 
size.

Another alternative could be to create the file to be written to immediately, 
and instead write each block into that as they arrive. You can calculate the 
place to write the block using the blocks index and the size of the blocks. 
This only works if we assume that all blocks other than the last completely 
fill the block. This may not be true is all situations (the assignment handout 
doesn't specify that this is the case), but is a reasonable assumption as 
you're the one implementing the final implementation. 

If you go for the approach of writing to the file directly you will save a 
good deal of memory space, but you may have to manage the file if something 
goes wrong halfway through retrieval. Presumably you don't want a half written 
file left on your system so make sure to delete it. Remember to test your 
final result using the _diff_ command. Most mistakes here are caused by not 
calculating the proper place to write each block within the file, so if you do 
encounter errors that would be the first place to start checking.

## 16: Optional - Concurrent File Management
One final consideration we might have is the return of concurrency problems. 
Note that this task is marked as optional as depending on how you solved 
previous tasks it may not be a problem. But if it is a problem for you you 
should probably solve it here, so its only sort-of optional. Retrieving a file 
may take time, so we might have a half assembled file still in the process of 
being written to. If another peer requests it at that time, we don't want it to
be served, as then we will provide a half-assembled file.

We should introduce some way of tracking which files the _client_thread_ is 
currently retrieving, so that if the _server_thread_ is asked to do so it will 
either refuse to do so, or wait until the file has finished being assembled. 
There are a few ways to do this, but I feel the most obvious is to add some 
shared variable between the two threads that can be updated with whatever files
are currently being retried. The _server_thread_ can then consult that variable
any time it attempts to serve a file, and not do so if it currently listed as 
being retrieved. Any mention of global variables should make you consider how 
you manage access to them, so as to avoid race conditions.

You should ensure that your system is free of deadlocks, presumably through the
use of some locking. If you end up having introduced multiple locks then you 
need to make sure that you have not further introduced the potential for 
deadlock. Remember that just the potential for deadlock is enough to be a 
problem, and just running your program a few times without problems is not 
enough to conclude that you're deadlock free.