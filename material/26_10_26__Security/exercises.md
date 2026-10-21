# Exercises for Concurrent Servers and Security

## Concurrent Servers
For this exercise you should modify your code from the previous exercises

### Ping/Pong
First lets modify the ping/pong example from last weeks 'Network Programming' 
exercise. In this exercise you should modify your server so that it can accept 
multiple client connections at the same time. Note that processing such a 
simple request may take trivial time so in order to test that it is indeed 
taking a lot of time you could modify the server processing to take longer. For 
instance, just adding a sleep or some large loop of processing so that you can 
concinvce yourself that yes, the server is indeed processing the requests 
concurrently (or in parallel if you've the hardware for it)

### Shared Variables
Next let us modify the shared variable example from the 'Network Programming' 
exercise. In this exercise your server storing the variable  should allow for 
multiple clients to connect at the same time, each being able to send GET or 
PUT messages independently of one another. At first this will seem trivially 
similar to the previous ping/pong exercise but now you have the added problem 
of a shared variable in your server code. 

* Optional sub-exercise - Can you intentionally get the shared variable to 
actually demonstrate a race condition using only one server and two clients? 
Feel free to make whatever edits are necessary in your client and server, even 
ones that artificially slow things down. 

Your task is now to prevent that race condition from ever occuring. Recall the 
lectures on concurrency and mutexes to get some idea where to start on this. 
Note that in practice this might mean that you end up sequentialising a lot of 
the concurrent execution of a multi-connection server but hey-ho its just an 
exercise.

## Security 
Exercises from Chapter 8 of Kurose and Ross on "Network Security"

Review questions, pg 710

* R3
* R6
* R10

Problems, pg 712

* P3 ( you try and do this programmatically )