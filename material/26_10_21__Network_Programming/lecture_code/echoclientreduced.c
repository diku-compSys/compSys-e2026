/*
 * echoclient.c - An echo client
 */

#include <arpa/inet.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h> 

#include "compsys_helpers.h"

#define	MAXLINE	 8192

int main(int argc, char **argv) 
{
    int clientfd;
    char *host, *port, buf[MAXLINE];
    struct sockaddr_in serv_addr;

    if (argc != 3) {
        fprintf(stderr, "usage: %s <host> <port>\n", argv[0]);
        exit(0);
    }
    host = argv[1];
    port = argv[2];

    // Create a socket and connect
    clientfd = compsys_helper_open_clientfd(host, port);
    
    // Start the user interaction
    printf("This program will attempt to send a string to a server. Type one "
           "here and hit enter to send: ");
    // Get some text from stdin and put it in a buffer
    while (fgets(buf, MAXLINE, stdin) != NULL) {
        int n = strlen(buf);

        // Set last byte to null
        buf[n-1] = '\0';

        // Write the buffer to the socket
        write(clientfd, buf, n);

        printf("Writing %d bytes\n", n);
        // Read from the buffer 
        read(clientfd, buf, MAXLINE);
        printf("Recieved reply: ");
        // Send the reply to stdout
        fputs(buf, stdout);
        printf("\nEnter another string: ");
    }

    // Make sure to close our socket. In practice we won't ever reach this line
    // as the above loop is infinite, but its a good habit to get into.
    close(clientfd);
    exit(0);
}
