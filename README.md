== IP ==

Esempio

`node ipvalidi.js  191.0.0.2/20`

> [-] E' valido

> [-] E' rete

> [-] Subnetting di 16 reti


== WIRELESS 1 ==

modifica lo script in base alle esigenze per ora

== WIRELESS 2 ==

Calcola se la risultante dei due segnali genera una comunicazione accettabile

`node wireless2.js [frequenza in Mhz] [differenza distanza]`


== SUBNETTING ==

Calcolatore di piano di indirizzamente locale ipv4 vlsm

`node subnetting.js 122.100.180.0/21`
>[-] Network 122.100.176.0/21
>
>[-] First Host 122.100.176.1
>
>[-] Last Host 122.100.183.253
>
>[-] Router 122.100.183.254
>
>[-] Broadcast 122.100.183.255
>
>[?] Quante subnet ci sono ? 2
>
>[?] Nome : A
>
>[?] Max host : 1018 
>
>[?] Nome : B
>
>[?] Max host : 208
>


>Subnet A (1018)
>
>[-] Network 122.100.176.0/22
>
>[-] First Host 122.100.176.1
>
>[-] Last Host 122.100.179.253
>
>[-] Router 122.100.179.254
>
>[-] Broadcast 122.100.179.255
>
>[-] Gateway 122.100.183.254
>
>[?] Quante subnet ci sono ? 2
>
>[?] Nome : A1
>
>[?] Max host : 57
>
>[?] Nome : A2
>
>[?] Max host : 279
>


>Subnet A2 (279)
>
>[-] Network 122.100.176.0/23
>
>[-] First Host 122.100.176.1
>
>[-] Last Host 122.100.177.253
>
>[-] Router 122.100.177.254
>
>[-] Broadcast 122.100.177.255
>
>[-] Gateway 122.100.179.254
>
>[?] Quante subnet ci sono ? 0
>


>Subnet A1 (57)
>
>[-] Network 122.100.178.0/26

>[-] First Host 122.100.178.1
>
>[-] Last Host 122.100.178.61
>
>[-] Router 122.100.178.62
>
>[-] Broadcast 122.100.178.63
>
>[-] Gateway 122.100.179.254
>
>[?] Quante subnet ci sono ? 0
>


>Subnet B (208)
>
>[-] Network 122.100.180.0/24
>
>[-] First Host 122.100.180.1
>
>[-] Last Host 122.100.180.253
>
>[-] Router 122.100.180.254
>
>[-] Broadcast 122.100.180.255
>
>[-] Gateway 122.100.183.254
>
>[?] Quante subnet ci sono ? 0
>

