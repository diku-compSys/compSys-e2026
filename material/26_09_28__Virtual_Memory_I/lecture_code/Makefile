CC=gcc
CFLAGS=-Wall -Wextra -pedantic
PROGRAMS=mem0 mem1 memfork spin

all: $(PROGRAMS)

%: %.c
	$(CC) -o $@ $^ $(CFLAGS)

clean:
	rm -f $(PROGRAMS)
