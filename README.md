== IP ==

Verifica la validita' degli ipv4, se sono rete oppure host, classe e quante sottoreti/superreti ci sono
<details>
<summary> Esempio </summary>

`node ipvalidi.js 191.0.0.2/20`

> [-] E' valido

> [-] E' rete

> [-] Subnetting di 16 reti
</details>

== NETWORK FLOW ==

Calcola thoughput , utilizzo percentuale della rete , dimensione massima dei pacchetti per avere congestione , formato dei pacchetti con protocollo IP, congestion window

<details>
<summary> Esempio </summary>

`node network_flow.js`

>[-] Scegli una delle opzioni
>
 >1. Calcola throughput
 >
 >2. Calcola utilizzo della rete
 >
 >3. Calcola dimensione massima del pacchetto per la congestion
 >
 >4. Trasmetti blocco dati con protocollo IP
 >
 >5. Congestion Window
 >
 > > 1
 >
 >[!] Si considera stop and wait !
 >
 >[?] Dimensione pacchetto in KB : 1
 >
 >[?] RTT in ms : 250
 >
 >[-] Throughput 4 KB/s
 >
 </details>

== WIRELESS 1 ==

Calcola la incognita per quanto riguarda la trasmissione wireless (fade margina, potenza di trasmissione, distanza ... ) e 
il raggio di Fresnel

<details>
<summary> Esempio </summary>

`node wireless1.js`

> Scegli una opzione
>
> [1] Cerca la incognita
>
> [2] Calcola raggio di Fresnel
>
> > 1
>
> [!] Ricorda che tutti i dati vanno inseriti positivi
>
> [!] Inserisci 'x' quando e' l'incognita da trovare
>
> [?] Guadagni : 14
>
> [?] Perdite ( >= 0 ): 0
>
> [?] Frequenza (Mhz) : 1900
>
> [?] Distanza (miglia) : 5
>
> [?] Potenza di trasmissione (dBm) : x
>
> [?] Receiver sensitivity (>= 0)(dBm) : 97
>
> [?] Fade margin [10,20] (dBm) : 0
>
> [?] C'e' nebbia ( o disturbi vari ) [y/n] : y
>
> [-] Uso fade margin di 10 dBm
>
> [-] Free space loss 116.15447210577696 dBm
>
> [-] Potenza ricevuta parziale -102.15447210577696 dBm
>
> [-] Potenza di trasmissione
>
>                15.15447210577696 dBm
>
>                32.76779444300169 mW
</details>

== WIRELESS 2 ==

Calcola se la risultante dei due segnali genera una comunicazione accettabile

`node wireless2.js [frequenza in Mhz] [differenza distanza]`

== SUBNETTING ==

Calcolatore di piano di indirizzamente locale ipv4 vlsm

<details>
<summary> Esempio </summary>

`node subnetting.js 122.100.180.0/21`

> [-] Network 122.100.176.0/21
>
> [-] First Host 122.100.176.1
>
> [-] Last Host 122.100.183.253
>
> [-] Router 122.100.183.254
>
> [-] Broadcast 122.100.183.255
>
> [?] Quante subnet ci sono ? 2
>
> [?] Nome : A
>
> [?] Max host : 1018
>
> [?] Nome : B
>
> [?] Max host : 208

> Subnet A (1018)
>
> [-] Network 122.100.176.0/22
>
> [-] First Host 122.100.176.1
>
> [-] Last Host 122.100.179.253
>
> [-] Router 122.100.179.254
>
> [-] Broadcast 122.100.179.255
>
> [-] Gateway 122.100.183.254
>
> [?] Quante subnet ci sono ? 2
>
> [?] Nome : A1
>
> > [?] Max host : 57
>
> [?] Nome : A2
>
> [?] Max host : 279

> Subnet A2 (279)
>
> [-] Network 122.100.176.0/23
>
> [-] First Host 122.100.176.1
>
> [-] Last Host 122.100.177.253
>
> [-] Router 122.100.177.254
>
> [-] Broadcast 122.100.177.255
>
> [-] Gateway 122.100.179.254
>
> [?] Quante subnet ci sono ? 0

> Subnet A1 (57)
>
> [-] Network 122.100.178.0/26

> [-] First Host 122.100.178.1
>
> [-] Last Host 122.100.178.61
>
> [-] Router 122.100.178.62
>
> [-] Broadcast 122.100.178.63
>
> [-] Gateway 122.100.179.254
>
> [?] Quante subnet ci sono ? 0

> Subnet B (208)
>
> [-] Network 122.100.180.0/24
>
> [-] First Host 122.100.180.1
>
> [-] Last Host 122.100.180.253
>
> [-] Router 122.100.180.254
>
> [-] Broadcast 122.100.180.255
>
> [-] Gateway 122.100.183.254
>
> [?] Quante subnet ci sono ? 0

</details>
