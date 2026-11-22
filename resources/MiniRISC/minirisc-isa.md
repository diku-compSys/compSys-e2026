# MiniRISC ISA

## Intro

Dette dokument beskriver ISAen (instruction set architecture) for MiniRISC.
MiniRISC er en lille 16 bit computer.
MiniRISC har 16 stk 16-bit registre, benævnt r0-r15, og 65536 stk 16-bit lagerceller.
Register r0 læses altid som nul, og skrivninger til r0 ignoreres.


## Instruktioner

MiniRISC har 23 instruktioner, 11 fylder en enkelt lagercelle og 12 fylder
to lagerceller.

Nedenstående tabel præsenterer samtlige instruktioner. Tegnene '0'-'9' og 'A'-'F'
angiver 4-bit hexadecimale værdier. Tegnene 'a','b' og 'd' angiver register-numre.
Tegnet 'c' angiver en betingelse. Tegnsekvensen 'iiii' angiver en 16-bit ikke-negativ
konstant.

    Indkodning  Assembler           Mening

    0dab        add d,a,b           d = a+b;
    1dab        sub d,a,b           d = a-b;
    2dab        and d,a,b           d = bitvis_and(a,b)
    3dab        or  d,a,b           d = bitvis_or(a,b)
    4dab        xor d,a,b           d = bitvis_xor(a,b)
    5dab        sl  d,a,b           d = skift mod venstre(a,b)
    6dab        asr d,a,b           d = aritmetisk skift mod højre(a,b)
    7dab        lsr d,a,b           d = logisk skift mod højre(a,b)
    8dab        ld  d,(a+b)         d = mem[a+b]
    9dab        st  d,(a+b)         mem[a+b] = d
    A000        sys                 syscall
    Ecabiiii    jcc d,a,i           if (c(a,b)) PC = i, c: =,!=,<,>=,< unsigned, >= unsigned 
    Fda0iiii    add d,a,i           d = a+i
    Fda1iiii    sub d,a,i           d = a-i
    Fda2iiii    and d,a,i           d = bitvis_and(a,i)
    Fda3iiii    or  d,a,i           d = bitvis_or(a,i)
    Fda4iiii    xor d,a,i           d = bitvis_xor(a,i)
    Fda5iiii    sl  d,a,i           d = skift mod venstre(a,i)
    Fda6iiii    asr d,a,i           d = aritmetisk skift mod højre(a,i)
    Fda7iiii    lsr d,a,i           d = logisk skift mod højre(a,i)
    Fda8iiii    ld  d,(a+i)         d = mem[a+i]
    Fda9iiii    st  d,(a+i)         mem[a+i] = d
    FdaAiiii    jmp d,a,i           d = nextPC; PC = a+i

Betingelser c (for jcc instruktionen):

0: eq, 1: ne, 2: lt, 3: gte, 4: ltu, 5: gteu

