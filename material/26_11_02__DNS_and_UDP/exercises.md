# Setting Up A2, Hashes and Salts and Basic Communication
This exercise is designed to get you started with A2. You will need to consult
the actual A2 handout for a lot of technical description and the big picture
of how it all fits together. 

Note, you do not need to follow this guide if you have your own ideas about 
how to solve A2. Additionally, this is not intended as a complete guide to 
every line you will need to write. It will describe much of the general 
structure and provide some specific functions as assistance, but you will need
to flesh out the bones provided here. 

Finally, do note that not all of the tasks described in these guides are equal.
Some will take considerably longer than others and so if you finish these all 
very quickly feel free to move on to the next. 

## 1: Setting up 
In order to interact with anyone else in the eventual network, any peer needs 
to be given a user-remembered password, that is to be salted and hashed. This 
salted and hashed password will be referred to as the _user signature_. It is 
intentionally ambiguous within the assignment text as to if a user should be 
prompted before every network request for the user remembered-password, or if 
we can just prompt once and be done with it. Prompting every time would be 
annoying to test on, so we can just adopt the strategy of asking as part of 
the peer startup. This has already been done for you in the handout, now we 
just need to apply the _user salt_ and hash it.

To store network addresses you have been provided the _Address_ struct,
whose definition is viewable in peer.h. An instance of this has been set up as 
the _my_address_ variable in peer.c so a peer can keep track of its own 
characteristics, and it is into here you should probably store the calculated 
user signature. This signature calculation probably wants to be its own 
function, as we will have to perform this operation repeatedly throughout the 
final implementation. Although you can place it within peer.c, you might also 
wish to place it in common.c (with corresponding signature in common.h) for 
neatness though this is not essential.

Your signature function itself will need to take as inputs the user password, 
the salt to combine with said password, and probably a location as to where to
write the signature. Also note, that any time you are operating on strings, it 
can also be a good idea to take a parameter of exactly how long it is. I would
suggest a function signature such as:

    void get_signature(char* password, int password_len, char* salt, hashdata_t* hash)

You may not need all these parameters, or may need more depending on how you 
solve the problem. I've not passed a length for the salt or the final 
signature as these are always the same, and given by the _SALT_LEN_ and 
_SHA256_HASH_SIZE_ global variables.

Within that function I would then set up a buffer of the combined length of 
both the password and the salt, and then copy each of these in to form one big 
combined string. The final step is now to hash this combined string, for which 
we can use the provided _get_data_sha_ function. Note that this functions 
second parameter is the location that the hash is written, which is why I 
included the same pointer in my _get_signature_ signature above. I would 
therefore need to set up a hash location to write to before calling the 
_get_signature_ function. This could be done like so:

    hashdata_t* signature = (hashdata_t*)malloc(sizeof(hashdata_t));

Once you've set up a get_signature function then you should call it using the
peers password and salt, before saving the address. I'd suggest doing this at
the marker on lines 212-216 of peer.c. Once we've set up the signature for the 
_my_address_ variable then it is complete. 

## 2: Sending a first register message
The simplest message to assemble will probably be the first to be sent, that 
being the initial registration message. In order to test this you should start 
a python peer to connect to, as described in the assignment handout and 
README.md. Depending on how much you've implemented or how robust your 
implementation is, you may need to restart the python peer between your 
connections, or you may not. You might want to start the python peer with the 
'-d' flag so that it will print out when it has received a message. Remember 
you can also add further debug messages or printing to the python as necessary.

Note that the client_thread when started in peer.c, already asks for an 
address to connect to. 

Again, you may wish to use a different variety of attributes. Note that at this 
point that although we are using the _Address_ struct to hold the IP 
and port of the _peer_address_, we do not yet know its password or salt and so 
they won't be populated, but hey, this just means we don't need to create 
another type of struct. As handed out, the send_message function will connect
to a given address, you now just need to add to and then call it. I would 
suggest calling it at the marker labeled '2: Sending a first register message' 
in peer.c.


## 3: Handing the response to the register message

As handed out, the send_message function _should_ work correctly to do just 
that, send a message. However on sending it immediately closes and will not 
wait for a response. Your peer should be capable of handling the response sent 
back to it. This may be in its own function, or as we always expect a reply, 
should probably be included as a second part of the send_message function at 
the marker '3: Handing the response to the register message' in peer.c.

Look to last weeks exercises on example of how you read messages, and also to 
how we wrote messages within the handed out send_message function. How 
much to read is set by the size of the reply header, which is given by the 
_REPLY_HEADER_LEN_ variable. We must only read the header first as we do not 
know how long the entire body is, but we can learn that from the header. 
Initially the header is just read into a buffer as a serise of bytes, so you 
must parse the different fields. For instance the first two being the length 
and the status could be read as:

    uint32_t reply_length = ntohl(*(uint32_t*)&reply_header[0]);
    uint32_t reply_status = ntohl(*(uint32_t*)&reply_header[4]);

These are reading one uint32 at a time, with the most important part to note 
being the final indexes of 0 and 4 at the end. These are essentially the 
position of these attributes within the total message. Note also we must 
convert from network to host order. 

Once you have all the header, we should then read the message body, whose 
length presumably matches the length told to us in the header. Remember at 
this point to perform some validation on the data you are reading. Is it 
sensible values that you expect to see, e.g. do we get a response status of 1 
e.g. OK? 

For now we can assume that any message we are receiving will fit into a single 
block, so perhaps avoid testing with 700 different peers. You should be able 
to get a complete network in a single message body, which you should read into 
a buffer. You can then take a hash of that message body using the 
_get_data_sha_ function and compare it against the hash given by the header. 
If those don't match then something's gone wrong, and you should report an 
error.

Assuming you've passed all your validation and read everything correctly, the 
next thing to do is recording all of the network peers you have been 
told about. You can derive how many peers there are as the length of the body 
should divide neatly into some multiple of 68 bytes, that being the length of 
a single peer address. For each of there we need to allocate a new 
_Address_ and copy the values from the message body. You will need to 
reallocate the global _network_ variable in order to store these new 
addresses, and update the _peer_count_ variable accordingly. Make sure not to 
add any addresses to your network that you already have a record of.

## 4: Setting Up Server Threading
Now lets look at some server interactions. Currently, the 
server side of the peer barely does anything, just starting, setting up a 
listening socket, printing some progrses reports and then finishing. We need it
to be capable of receiving requests from other peers, and for doing so in a 
non-blocking manner. This will require some threading, with inbound connections
handed off to a handling thread. 

Note that as we're building a relatively small network you do not need to 
manage the amount of threads you are creating here, we will just start as many 
threads as we receive connections as we should never receive that many 
connections at once.

You can look to the exercises from the 'Network Programming' lecture to get 
some guiding examples on how to set up a non-blocking server. Once we have set 
up a listening socket then it would make sense to enter a loop, where each 
iteration waits for an inbound communication attempt. As we accept these 
inbound communications we should spawn off a thread to handle that request. 
Note that we will not call _pthread_join_ on that thread, as that would 
sequentialise our code. We shall simply start the handling thread and then our 
main _server_thread_ will return to listening for new inbound communications. 
As a hint for some of the problems we will need to solve next week, this setup 
means that a single peer may have multiple handling threads running at the same
time, which could introduce problems such as race conditions or deadlocks. This
will be returned to within these guides, just keep it in mind for now.

I've already written a simple function that we could use to run request threads
called handle_server_request_thread. Note the line:

    pthread_detach(pthread_self());

This just makes the thread independent of the calling thread so we don't need 
to call pthread_join in order to properly clean up once it is done. You should 
probably start at the marker '4: Setting Up Server Threading' in peer.c

## 5: Reading server requests
Any time we are invoking our handling thread, it is because someone is sending 
us a message, which we should probably read. In order to do this we should use 
the _compsys_helper_readnb_ function to read our message into a 
pre-initialised buffer. I'd suggest working at the marker '5: Reading Server 
Requests' in peer.c. We can use the same logic we've previously used in reading
our responses to parse our reading the initial request. We don't know the 
entire content of the message, but we know that any request we will receive 
will be using the same Request Header, with a length given to us by the 
_REQUEST_HEADER_LEN_ variable. We can read the header into the _RequestHeader_
struct also using very similar logic as reading the response, though do make 
sure to know the differences in what fields are included and where in the 
message.

Once we have read the header we know how long the body (if any) there is to 
read, so we should make sure to read that too if there is one. We may also 
wish at this stage to perform input validation, such as does the header 
specify a valid command and such like.

## 6: Handling Register Requests
Now that we have some very basic server interactions it's time to start 
implementing the other half of the interaction we made last exercise, e.g. to 
actually parse a register request from another peer and to generate a response 
to it. To test this you could run either the Python peer, or your C peer and 
try and get it to connect to your implementation.

From the previous task we should already have the initial reading of the 
request, by parsing the header. You may wish to introduce a new function to 
handle the register messages, or you many wish to keep it all within your 
larger handling thread. 

Make sure that before you do any actual registration handling you perform some 
input validation. Within 'common.c' there are the functions _is_valid_ip_, 
_is_valid_port_, and _is_valid_port_str_ that may help with this. You should 
also validate that you are not registering a peer that is already in the 
network.

Assuming the registration request is validly formatted, then your peer should 
create a new _Address_ struct to store the peer details. The IP and 
port should just be copied from the message, but we will not save the 
peer-provided signature directly. Instead, we are to salt and hash the 
provided signature into a network-saved signature.

This time, rather than a hard coded salt we are going to randomly generate it. 
For this we can use the _generate_random_salt_ function, as well as the logic 
you have used for generating user signatures. You may need to tweak any 
signature generating function slightly to accommodate some potentially 
different input datatypes. Only the salted and hashed signature should be 
saved in the peer _Address_ struct, along with the randomly generated 
salt.

Finally, you should append the peer _Address_ to the global _network_ 
variable. Make sure to update the _peer_count_ variable as appropriate too. 
Note that according to the protocol at this stage we should also be generating 
an Inform message for each of the other peers on the network, but we will hold 
off on doing that until next exercise.

## 7: Generating Register Responses
Part of the protocol description is that a response is always expected to a 
registration request. We should therefore create such a response. There are 
two parts to this, generating the message content to send, and creating a 
function for assembling reply messages. 

Generating the actual message content should be reasonably straight forward. 
You just need to copy each network entry to one large buffer, and then this 
can become the message body. Make sure to consult with the A3 handout if you 
need to check which element goes where in the message body.

Now to send the actual message itself you will need to assemble a header. As 
we may wish to send several different types of response message, I think it is 
worth creating another function to generically create response messages. The 
signature I used was ended up like so:

    void send_response(uint32_t connfd, uint32_t status, char* response_body, int response_length)

You may of course differ from this if you wish. For the time being we can 
ignore the possibility of a response being need to be sent over several 
messages and assume that it will all fit in one. In this case, we just need to 
assemble a single instance of the _ReplyHeader_ struct, remembering to ensure 
all the numeric values are in the correct byte ordering. Also note that if the 
message is being sent over only a single message, then the _total_hash_ and 
_block_hash_ will have identical values. Once you have assembled your header 
and body, you should write them to the connection.

If you have not done so already, make sure that you close the connection in 
your request handling thread, once you have sent the expected response. You 
should be able to test now with either the python peer, or with a second C 
peer with either being able to connect to the other. As it is within the 
Python peer, it will refuse a registration request from someone who has 
already registered, but you do not have to use the same logic within your own. 
Perhaps you find it more helpful to provide the response that although the 
user already exists and will not be registered again, you still provide a 
complete network list. That may make your system more robust to peers joining 
repeatedly though is not an essential thing to implement. 

Each peer should be able to handling multiple requests at the same time. This 
might be hard to manually test without inserting some delays into your system,
such as _sleep(60)_ to slow each handling down by a minute (you may wish to 
delay for even longer). 