# Øvelser til 9. december

## Optakt til dagens forelæsning

Betragt slide 7 "flow af fysiske register numre" fra forelæsningen mandag 7/12.

Ved registeromdøbning omskrives instruktionen så logiske register numre (dem programmøren
ser) erstattes med fysiske registernumre. Det fysiske register nummer for destinationsregisteret
fås fra frilisten, de fysiske registernumre for kilderegistrene fås fra omdøbningstabellen.

Overvej om der senere i forløbet stadig er brug for det logiske register nummer for destination
eller kilderegistre? hvis ja, til hvad?

Når en instruktion fuldføres frigives et fysisk register nummer tilbage til frilisten.
Overvej/diskuter (SVÆRT) hvilket fysisk register nummer det kan være? Hvor kommer det fra?



Nedenstående opgaver tager udgangspunkt i dataflow maskinen præsenteret mandag 8/12.


## Opgave 1

Opstil en risc-v kodesekvens:

 * hvor en load der følger efter en store tilgår samme adresse og derfor skal "se" data fra store instruktionen
 * hvor store data (formodentlig) endnu ikke er tilgængelig i store-køen på det tidspunkt, hvor load instruktionen skal bruge det

diskuter/opstil/giv en mere præcis definition af disse krav.
hint: hvilken information skal være tilstede i hvilket pipeline trin, for at
en load kan "se" en store? Og hvilken information skal være tilstede i hvilket
pipeline trin, for store-data kan "forwardes" til en load.

(Du kan ikke finde præcis svar, så prøv i stedet at gøre forskellige antagelser
og overvej, hvilke der synes rimelige)


## Opgave 2

### Spg 1

Opstil en risc-v kodesekvens:

 * hvor en load der følger efter en store tilgår samme adresse og derfor skal "se" data fra store instruktionen
 * hvor store addressen endnu ikke er tilgængelig i store-køen på det tidspunkt, hvor load instruktionen har brug
   for at sammenligne addresser.

diskuter/opstil/giv en mere præcis definition af det sidste af disse to krav.
Se hint i opgave 1.


### Spg 2

Opstil et afviklingsplot som illustrerer ovenstående på den out-of-order maskine der blev præsenteret
mandag 7/12. Diskuter evt hvornår load instruktionen tidligst kan gennemføre et writeback.



