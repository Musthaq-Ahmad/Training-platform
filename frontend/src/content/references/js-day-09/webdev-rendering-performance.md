Gli utenti notano se i siti e le app non funzionano bene, quindi ottimizzare le prestazioni di rendering è fondamentale.

Gli utenti del web di oggi si aspettano che le pagine che visitano siano interattive e scorrevoli ed è su questo aspetto che devi concentrare sempre di più il tuo tempo e i tuoi sforzi. Le pagine non devono solo caricarsi rapidamente, ma anche rispondere rapidamente all'input dell'utente durante tutto il loro ciclo di vita. In effetti, questo aspetto dell'esperienza utente è esattamente ciò che misura la metrica [Interaction to Next Paint (INP)](https://web.dev/articles/inp?hl=it). Un buon INP indica che una pagina ha risposto in modo coerente e affidabile alle esigenze dell'utente.

Sebbene un componente importante di ciò che rende una pagina scattante riguardi la quantità di codice JavaScript che esegui in risposta alle interazioni degli utenti, ciò che gli utenti si aspettano sono le modifiche visive all'interfaccia utente. Le modifiche visive a un'interfaccia dell'utente sono il risultato di diversi tipi di attività, spesso indicate collettivamente come _rendering_, che devono essere eseguite il più rapidamente possibile in modo che l'esperienza utente sia veloce e affidabile.

Per scrivere pagine che rispondano rapidamente alle interazioni degli utenti, devi capire come HTML, JavaScript e CSS vengono gestiti dal browser e assicurarti che il codice che scrivi, così come qualsiasi altro codice di terze parti che includi, venga eseguito nel modo più efficiente possibile.

## Nota sulle frequenze di aggiornamento dei dispositivi

![Un utente che interagisce con un sito web su un cellulare.](https://web.dev/static/articles/rendering-performance/image/user-interacting-a-websi-f32989a67c995.jpg?hl=it)

La frequenza di aggiornamento di un display è un fattore importante per la creazione di siti web che rispondano in modo dinamico all'input degli utenti.

La maggior parte dei dispositivi attuali aggiorna gli schermi **60 volte al secondo**. Ogni aggiornamento produce l'output visivo che vedi ed è comunemente noto come _frame_. Nel video seguente viene illustrato il concetto di frame:

I frame come mostrato nel riquadro delle prestazioni di Chrome DevTools. Quando il cursore scorra la sequenza di immagini nella parte superiore, viene visualizzata una rappresentazione ingrandita di ogni fotogramma in una descrizione comando mentre un menu di navigazione mobile passa allo stato "aperto".

Sebbene lo schermo di un dispositivo si aggiorni sempre a una frequenza costante, le applicazioni che vengono eseguite su un dispositivo potrebbero non essere sempre in grado di produrre frame sufficienti per eguagliare questa frequenza di aggiornamento. Ad esempio, se è in esecuzione un'animazione o una transizione, il browser deve corrispondere alla frequenza di aggiornamento del dispositivo per produrre un frame ogni volta che lo schermo viene aggiornato.

Dato che un display standard si aggiorna 60 volte al secondo, alcuni calcoli rapidi rivelano che il browser ha 16,66 millisecondi per produrre ogni frame. Tuttavia, in realtà il browser ha il proprio overhead per ogni frame, quindi tutto il tuo lavoro deve essere completato in **10 millisecondi**. Se non riesci a soddisfare questo budget, la frequenza fotogrammi diminuisce e i contenuti della pagina tremolano sullo schermo. Questo fenomeno è spesso chiamato _jank_.

Tuttavia, i target cambiano in base al tipo di lavoro che stai cercando di svolgere. Il raggiungimento della soglia di 10 millisecondi è fondamentale per le _animazioni_, in cui gli oggetti sullo schermo vengono interpolati in una serie di frame tra due punti. Per quanto riguarda le modifiche discrete nell'interfaccia utente, ovvero il passaggio da uno stato all'altro senza alcuna transizione intermedia, è consigliabile apportare queste modifiche in un lasso di tempo che _sembra_ istantaneo per l'utente. In questi casi, 100 millisecondi è una cifra spesso citata, ma la soglia "buona" della metrica INP è pari o inferiore a 200 millisecondi per supportare una gamma più ampia di dispositivi con funzionalità diverse.

Indipendentemente dai tuoi obiettivi, che si tratti di produrre i molti frame necessari per le animazioni per evitare scatti o semplicemente di produrre una modifica visiva discreta nell'interfaccia utente il più rapidamente possibile, è essenziale comprendere il funzionamento della pipeline dei pixel del browser.

## La pipeline di pixel

Esistono cinque aree principali che devi conoscere e tenere presenti nel tuo lavoro di sviluppatore web. Queste cinque aree sono quelle su cui hai il controllo maggiore e ognuna rappresenta un punto chiave nella pipeline da pixel a schermo:

![La pipeline completa dei pixel, contenente cinque passaggi: JavaScript, Stile, Layout, Pittura e Composito.](https://web.dev/static/articles/rendering-performance/image/the-full-pixel-pipeline-45b24543207ea.jpg?hl=it)

La pipeline completa dei pixel, illustrata.

- **JavaScript**:in genere, JavaScript viene utilizzato per gestire attività che comportano modifiche visive all'interfaccia utente. Ad esempio, potrebbe trattarsi della funzione `animate` di jQuery, dell'ordinamento di un set di dati o dell'aggiunta di elementi DOM alla pagina. Tuttavia, JavaScript non è strettamente necessario per attivare le modifiche visive: le [animazioni CSS](https://web.dev/learn/css/animations?hl=it), le [transizioni CSS](https://web.dev/learn/css/transitions?hl=it) e l'[API Web Animations](https://developer.mozilla.org/docs/Web/API/Web_Animations_API) sono in grado di animare i contenuti della pagina.
- **Calcoli dello stile**:si tratta del processo di individuazione delle regole CSS da applicare agli elementi HTML in base ai selettori corrispondenti. Ad esempio, `.headline` è un esempio di selettore CSS che si applica a qualsiasi elemento HTML con un valore dell'attributo `class` contenente una classe `headline`. Da lì, una volta conosciute le regole, queste vengono applicate e vengono calcolati gli stili finali per ogni elemento.
- **Layout**:una volta che il browser sa quali regole si applicano a un elemento, può iniziare a calcolare la geometria della pagina, ad esempio lo spazio occupato dagli elementi e dove vengono visualizzati sullo schermo. Il modello di layout del web consente a un elemento di influire su altri. Ad esempio, la larghezza dell'elemento `<body>` solitamente influisce sulle dimensioni dei suoi elementi secondari dall'inizio alla fine della struttura ad albero, pertanto la procedura può essere piuttosto complessa per il browser.
- **Vernice:** la vernice è il processo di riempimento dei pixel. È necessario disegnare testo, colori, immagini, bordi, ombre e, in sostanza, ogni aspetto visivo degli elementi dopo aver calcolato il loro layout sulla pagina. Il disegno viene in genere eseguito su più superfici, spesso chiamate livelli.
- **Composto**:poiché le parti della pagina potrebbero essere state disegnate su più livelli, devono essere applicate allo schermo nell'ordine corretto affinché la pagina venga visualizzata come previsto. Questo è particolarmente importante per gli elementi che si sovrappongono, poiché un errore potrebbe causare la visualizzazione errata di un elemento sopra un altro.

Ognuna di queste parti della pipeline di Pixel rappresenta un'opportunità per introdurre ritardi nelle animazioni o ritardare la visualizzazione dei frame anche per modifiche visive discrete all'interfaccia utente. È quindi importante capire esattamente quali parti della pipeline vengono attivate dal codice e verificare se è possibile limitare le modifiche solo alle parti della pipeline dei pixel necessarie per il rendering.

Potresti aver sentito il termine "rasterizza" utilizzato in combinazione con "dipingi". Questo accade perché la pittura è in realtà composta da due attività:

1.  Creazione di un elenco di chiamate draw.
2.  Riempimento dei pixel.

Quest'ultima è chiamata "rasterizzazione", quindi ogni volta che vedi record di pittura in DevTools, devi pensare che includa la rasterizzazione. In alcune architetture, la creazione dell'elenco delle chiamate di disegno e della rasterizzazione avviene su thread diversi, ma non è sotto il tuo controllo in qualità di sviluppatore.

Non è sempre necessario modificare ogni parte della pipeline in ogni frame. In effetti, quando apporti una modifica visiva, con JavaScript, CSS o l'API Web Animations, la pipeline viene eseguita _normalmente_ in tre modi per un determinato frame.

### 1\. JS / CSS > Stile > Layout > Pittura > Composito

![La pipeline completa dei pixel, senza omettere nessuno dei passaggi.](https://web.dev/static/articles/rendering-performance/image/the-full-pixel-pipeline-8f8a7297e4f77.jpg?hl=it)

Se modifichi una proprietà "layout", ad esempio una che modifica la geometria di un elemento come larghezza, altezza o posizione (ad esempio le proprietà CSS `left` o `top`), il browser deve controllare tutti gli altri elementi e "riorganizzare" la pagina. Le aree interessate dovranno essere ridipinte e gli elementi dipinti finali dovranno essere ricomponiti.

### 2\. JS / CSS > Stile > Pittura > Composito

![La pipeline di Pixel con il passaggio di layout omesso.](https://web.dev/static/articles/rendering-performance/image/the-pixel-pipeline-witho-346f1f6fd4ada.jpg?hl=it)

Se hai modificato una proprietà "solo pittura" per un elemento in CSS, ad esempio proprietà come `background-image`, `color` o `box-shadow`, il passaggio di layout non è necessario per applicare un aggiornamento visivo alla pagina. Se possibile, omettendo il passaggio di layout, eviti un lavoro di layout potenzialmente costoso che altrimenti avrebbe contribuito a una latenza significativa nella produzione del frame successivo.

### 3\. JS / CSS > Stile > Composito

![La pipeline di pixel con i passaggi di layout e pittura omessi.](https://web.dev/static/articles/rendering-performance/image/the-pixel-pipeline-withou-c9b3dd7e7ab5f.jpg?hl=it)

Se modifichi una proprietà che non richiede _né_ layout né pittura, il browser può passare direttamente al passaggio di composizione. Si tratta del percorso più economico e auspicabile nella pipeline dei pixel per i punti di alta pressione nel ciclo di vita di una pagina, ad esempio animazioni o scorrimento. Curiosità: Chromium ottimizza lo scorrimento della pagina in modo che si verifichi solo nel thread del compositore, se possibile. Ciò significa che, anche se una pagina non risponde, puoi comunque scorrerla e vedere le parti che sono state precedentemente disegnate sullo schermo.

Le prestazioni web sono l'arte di _evitare_ il lavoro, aumentando al contempo al massimo l'efficienza di qualsiasi lavoro necessario. In molti casi, si tratta di lavorare con il browser, non contro di esso. Vale la pena ricordare che il lavoro precedentemente mostrato nella pipeline è diverso in termini di costo computazionale; alcune attività sono intrinsecamente più costose di altre.

Diamo un'occhiata alle diverse parti della pipeline. Esamineremo i problemi comuni e come diagnosticarli e risolverli.

## Ottimizzazioni del rendering del browser

[![Screenshot del corso di Udacity](https://web.dev/static/articles/rendering-performance/image/udacity-course-screenshot-4c7c3a821e1fa.jpg?hl=it)](https://www.udacity.com/course/browser-rendering-optimization--ud860)

Le prestazioni sono importanti per gli utenti e, per creare esperienze utente positive, gli sviluppatori web devono creare siti web che reagiscono rapidamente alle interazioni degli utenti e si visualizzano senza problemi. Paul Lewis, esperto di prestazioni, è a tua disposizione per aiutarti a eliminare il jitter e creare app web che mantengono un rendimento di 60 frame al secondo. Al termine di questo corso avrai a disposizione gli strumenti necessari per profilare le app e identificare le cause di un rendimento del rendering non ottimale. Esplorerai anche la pipeline di rendering del browser e scoprirai pattern che ti consentiranno di creare più facilmente siti web veloci che gli utenti troveranno piacevoli da usare.

Si tratta di un corso senza costi offerto tramite [Udacity](https://www.udacity.com/) e puoi [parteciparvi in qualsiasi momento](https://www.udacity.com/course/browser-rendering-optimization--ud860).
