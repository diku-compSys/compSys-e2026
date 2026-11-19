# Øvelser til 7. december

## Optakt til dagens forelæsning

Opg 1:

Nedenstående RISCV kode afvikles på en 9-trins "realistisk pipeline" som defineret i slides 22 - 23
fra onsdag 3/12.


~~~
loop :
    LBU a4, 0(a2)
    BEQ a4, zero, loop_exit
    ADDI a2, a2, 1
    ADDI a5, a5, 1
    SB a4, -1(a5)
    BNE a5, a0, loop
loop_exit:
~~~

Koden er en løkke der udføres mange gange. Bestem hvor mange clock-cycles det i gennemsnit 
tager at afvikle en iteration. Du kan antage:

 * Perfekt hopforudsigelse.
 * hopforudsigelse i Fb, så ved hop følger Fa for den instruktion der hoppes til
   umiddelbart efter Fb for hop instruktionen.
 * Pipelinen har fuld forwarding af operander.

Besvar spørgsmålet ved at tegne et afviklingsplot (som gjort på nævnte slides)
der viser 2 gennemløb. Svaret skulle gerne kunne udledes af 2. gennemløb.


## Øvelser relateret til forelæsning onsdag sidste uge (2/12)


Følgende øvelser fra COD:

4.16, 4.18, 4.20, 4.23 og 4.31

evt. Overskydende øvelser fra tidligere øvelsesgange.
