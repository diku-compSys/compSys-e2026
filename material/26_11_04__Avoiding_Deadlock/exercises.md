# Informing, Error Handling and Transfering Small Files
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

## 8: Sending an Inform Message
In the last set of exercises when handling a registration request we did not 
include informing all previously existing peers on the network of the new 
peer. Let us do so now. Assuming we've set up or previous implementation 
sensibly then this could be a very quick implementation. All we need to do is 
loop through the entire _network_ global variable and send a simple message 
with the newly added peer. It would make sense to do this alongside our 
registration handling. Note we should avoid sending an inform message either 
to ourselves, or to the actual registering peer as they both presumably 
already know about the registering peer. We should also avoid sending a record
of any peers that do not have a _network signature_ or _network salt_ yet. This
should only occur for a peer that has not yet completed registration, but if we
sent that to the wider network without such attributes we'd never be able to 
connect to it.

Something additional to consider at this point is your logic for sending a 
request to another peer. Have you assumed you are always getting a response? 
The inform message does not expect a response, so if so be sure to discount it 
from the response waiting. If you are not always waiting for a response then 
you should be making sure that you do wait in the case of any other request 
messages.

Testing this may be quite complex. You will probably need at least 3 peers, 
and they should probably print the contents of their _network_ after each 
update to it. Consider if you have 3 peers, A, B and C. If you start A then 
connect B each should be able to eventually print that the complete network is 
A and B. If you then connect C to A, then you would also hope that all three 
can eventually print that the complete network is A, B and C. This will only 
happen if A sends an inform message to B about C.

## 9: Handling an Inform Message
Similarly, handling the inform message should also be relatively quick to 
implement, at least initially. This could probably be a very similar function 
to how you handle the actual registration request only with no response being 
generated. Simple parse the message contents and update the _network_ variable 
as appropriate, making sure not to add the peer if it is already in the 
network.

Now it hopefully hasn't escaped your notice that we have numerous points in 
our code already where we are modify the global _network_ variable. This is a 
recipe for a race condition. You might not have noticed this from your testing 
as in practice it would be very hard to send things at exactly the right time 
to actually cause this race condition, but it does exist as a possibility, and 
so we must handle it. Also note that how severe this problem actually is, and 
if it is only present on the _network_ variable is dependent on your 
implementation. You may have more global variables and will need to manage 
them appropriately as well.

If you are not convinced of how this race condition could occur you should 
consider a much larger set of peers than you have probably been testing with, 
and over an actual network rather than just testing locally on your machine. 
Actual networking is considerably slower than local messages, which means 
there will be a significantly larger delay between sending a request and 
receiving a response. Consider if two new peers join at the same time, both 
will generate inform messages at the same time, which may both be received at 
the same time by another peer. Each of these inform messages would be handled 
on their own thread and could each be accessing the _network_.

There are a few different approaches we could use to manage our access to 
shared variables, but the most obvious here is probably to introduce a mutex. 
You may even need more than one lock, depending on your implementation. You 
should surround every interaction with the _network_ with a lock to ensure 
that correctness is maintained. Consider if the code you have written is still 
suitable. Do you need to rework any logic to ensure the minimum amount of code 
is within a lock? The more you can minimise lock usage, the more parallelism 
you are ensuring in your system. Also make sure that if you grab a lock, you 
ALWAYS release it at some point. You must not carelessly encounter any errors 
or return from a function without releasing it.

## 10: Sending Error Responses
One small task we should probably do before we go any further is introducing 
some error messages. Hopefully you've been validating your inputs within the 
request handling thread, and if something fails then an error response must be
sent. It would probably be worth standardising the construction of error 
messages in a function. I also added a line that will print error message as 
well to help debugging, you might wish to add similar functionality.

## 11: OPTIONAL - Getting a Random Peer
Now that our implementation is capable of sending a register message to 
retrieve the network, it is worth implementing a function to retrieve a random 
peer from that network. This will be used any time that we want to retrieve a 
file, so we might not need it for a wee while, but we can achieve it now, and 
it's relatively simple. Note this task is marked as optional as an alternative 
could be just to select the first peer in our _network_ that isn't us but thats
boring.

For this, all we need to do is randomly select a peer from our global 
_network_ variable. How you do this will depend on how you have set up your 
_network_, e.g. does it include your own address or not. If it does, you need 
to make sure that you do not return your own address. A quick any easy way of 
generating a random number in a certain range is:

    uint32_t number = rand() % max;

This will generate a random integer value greater than or equal to zero, and 
less than max. Be sure that you also have not re-introduced any race 
conditions that you hopefully solved in the last exercise.

## 12: Sending a File Request
It's finally time to start looking at actually retrieving some files. The 
starting point here is probably to modify the _client_thread_ function, to 
introduce a point where we ask the user for the name of a file to attempt to 
retrieve. In order to get the user input you can probably use the same logic 
as how we've retrieved the _peer_ip_ and _peer_port_ variables. Once you have 
a filename to retrieve then we can select a random peer as previously 
implemented and just need to assemble a message, which we've hopefully already 
started implementing in a _send_message_ function way back with the 
registration messages. Note that this whole interaction should take place 
within a loop, so that once we have completed this retrieval we start again.

We could create a new function for sending a file request message, or could 
incorporate it into the existing function for sending a request message. 
Personally I would put them both together as they share so much logic, though 
it is of course up to you. Regardless of how you do it you will need to do a 
lot of the same logic as in initially sending the registration request. The 
header will need to be assembled in the same manner, though this time you will 
also need to make sure to include a message body. Even if you have not 
implemented this within your request generation function, you should have 
implemented very similar logic within the response function. Note that here 
we're still assuming that everything fits into a single message, so a file to 
test with could be the provided _tiny.txt_ 

At this point we should also implement handling the reply to our request. This 
should be fairly straight forward, creating a file with the same name as was 
requested, and filling it with the reply body. As we're assuming for now that 
the entire file fits into a single message we don't need to do anything fancy, 
just write that message body into the file. Do remember to keep doing regular 
validation, such as that the total hash still matches the data you've been 
given. This might have been covered by your previous implementations, or you 
might need to add it in again. 

## 13: Handling a File Request
We should also implement the server side handling of a retrieve request. Note 
that here we should add a bit more validation, not just of the regular message 
content but also of the file we are retrieving. For instance, our peer should 
be able to serve any file under it within the file directory, but it shouldn't 
serve anything above it. This is a good security principle to stick to as it 
prevents a peer just spuriously requesting any file on our system, some of 
which are presumably private. Doing this robustly can be quite an involved 
process but a good first step is to remove any leading '/' characters. This 
should ensure that any paths are at least relational to the peers working 
directory. 

    memmove(request, request+1, strlen(request))

A line such as the one above will remove the first character from a string 
while maintaining the pointer to that string at the same location. Of course 
you should make sure to only do so if necessary. Another helpful function 
could be this:

    fseek(fp, 0L, SEEK_END);
    int file_size = ftell(fp);

This will move the file position indicator to the end of the file pointed to 
by _fp_, and will then read that position into the _file_size_ variable. The 
name might be a hint here, but this will then give us the total length of that 
file, which presumably will also be the length of the message body. 

Once this and the previous task have been completed you should be able to 
fully retrieve small files. Make sure to test with the _diff_ command to check 
that your retrieved file contents are indeed the same as the original. 