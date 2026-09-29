import type { ContentTopic } from '../../../types';

export const webdevRenderingPerformanceTopics = {
  'webdev-rendering-performance': {
    id: 'webdev-rendering-performance',
    heading: 'Nota sulle frequenze di aggiornamento dei dispositivi',
    blocks: [
      {
        type: 'paragraph',
        text: "La frequenza di aggiornamento di un display è un fattore importante per la creazione di siti web che rispondano in modo dinamico all'input degli utenti.",
      },
      {
        type: 'paragraph',
        text: "La maggior parte dei dispositivi attuali aggiorna gli schermi 60 volte al secondo. Ogni aggiornamento produce l'output visivo che vedi ed è comunemente noto come frame. Nel video seguente viene illustrato il concetto di frame:",
      },
      {
        type: 'paragraph',
        text: 'I frame come mostrato nel riquadro delle prestazioni di Chrome DevTools. Quando il cursore scorra la sequenza di immagini nella parte superiore, viene visualizzata una rappresentazione ingrandita di ogni fotogramma in una descrizione comando mentre un menu di navigazione mobile passa allo stato "aperto".',
      },
      {
        type: 'paragraph',
        text: "Sebbene lo schermo di un dispositivo si aggiorni sempre a una frequenza costante, le applicazioni che vengono eseguite su un dispositivo potrebbero non essere sempre in grado di produrre frame sufficienti per eguagliare questa frequenza di aggiornamento. Ad esempio, se è in esecuzione un'animazione o una transizione, il browser deve corrispondere alla frequenza di aggiornamento del dispositivo per produrre un frame ogni volta che lo schermo viene aggiornato.",
      },
      {
        type: 'paragraph',
        text: 'Dato che un display standard si aggiorna 60 volte al secondo, alcuni calcoli rapidi rivelano che il browser ha 16,66 millisecondi per produrre ogni frame. Tuttavia, in realtà il browser ha il proprio overhead per ogni frame, quindi tutto il tuo lavoro deve essere completato in 10 millisecondi. Se non riesci a soddisfare questo budget, la frequenza fotogrammi diminuisce e i contenuti della pagina tremolano sullo schermo. Questo fenomeno è spesso chiamato jank.',
      },
      {
        type: 'paragraph',
        text: "Tuttavia, i target cambiano in base al tipo di lavoro che stai cercando di svolgere. Il raggiungimento della soglia di 10 millisecondi è fondamentale per le animazioni, in cui gli oggetti sullo schermo vengono interpolati in una serie di frame tra due punti. Per quanto riguarda le modifiche discrete nell'interfaccia utente, ovvero il passaggio da uno stato all'altro senza alcuna transizione intermedia, è consigliabile apportare queste modifiche in un lasso di tempo che sembra istantaneo per l'utente. In questi casi, 100 millisecondi è una cifra spesso citata, ma la soglia \"buona\" della metrica INP è pari o inferiore a 200 millisecondi per supportare una gamma più ampia di dispositivi con funzionalità diverse.",
      },
      {
        type: 'paragraph',
        text: "Indipendentemente dai tuoi obiettivi, che si tratti di produrre i molti frame necessari per le animazioni per evitare scatti o semplicemente di produrre una modifica visiva discreta nell'interfaccia utente il più rapidamente possibile, è essenziale comprendere il funzionamento della pipeline dei pixel del browser.",
      },
      {
        type: 'paragraph',
        text: 'Esistono cinque aree principali che devi conoscere e tenere presenti nel tuo lavoro di sviluppatore web. Queste cinque aree sono quelle su cui hai il controllo maggiore e ognuna rappresenta un punto chiave nella pipeline da pixel a schermo:',
      },
      {
        type: 'paragraph',
        text: 'La pipeline completa dei pixel, illustrata.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          "JavaScript:in genere, JavaScript viene utilizzato per gestire attività che comportano modifiche visive all'interfaccia utente. Ad esempio, potrebbe trattarsi della funzione animate di jQuery, dell'ordinamento di un set di dati o dell'aggiunta di elementi DOM alla pagina. Tuttavia, JavaScript non è strettamente necessario per attivare le modifiche visive: le animazioni CSS, le transizioni CSS e l'API Web Animations sono in grado di animare i contenuti della pagina.",
          "Calcoli dello stile:si tratta del processo di individuazione delle regole CSS da applicare agli elementi HTML in base ai selettori corrispondenti. Ad esempio, .headline è un esempio di selettore CSS che si applica a qualsiasi elemento HTML con un valore dell'attributo class contenente una classe headline. Da lì, una volta conosciute le regole, queste vengono applicate e vengono calcolati gli stili finali per ogni elemento.",
          "Layout:una volta che il browser sa quali regole si applicano a un elemento, può iniziare a calcolare la geometria della pagina, ad esempio lo spazio occupato dagli elementi e dove vengono visualizzati sullo schermo. Il modello di layout del web consente a un elemento di influire su altri. Ad esempio, la larghezza dell'elemento &lt;body&gt; solitamente influisce sulle dimensioni dei suoi elementi secondari dall'inizio alla fine della struttura ad albero, pertanto la procedura può essere piuttosto complessa per il browser.",
          'Vernice: la vernice è il processo di riempimento dei pixel. È necessario disegnare testo, colori, immagini, bordi, ombre e, in sostanza, ogni aspetto visivo degli elementi dopo aver calcolato il loro layout sulla pagina. Il disegno viene in genere eseguito su più superfici, spesso chiamate livelli.',
          "Composto:poiché le parti della pagina potrebbero essere state disegnate su più livelli, devono essere applicate allo schermo nell'ordine corretto affinché la pagina venga visualizzata come previsto. Questo è particolarmente importante per gli elementi che si sovrappongono, poiché un errore potrebbe causare la visualizzazione errata di un elemento sopra un altro.",
        ],
      },
      {
        type: 'paragraph',
        text: "Ognuna di queste parti della pipeline di Pixel rappresenta un'opportunità per introdurre ritardi nelle animazioni o ritardare la visualizzazione dei frame anche per modifiche visive discrete all'interfaccia utente. È quindi importante capire esattamente quali parti della pipeline vengono attivate dal codice e verificare se è possibile limitare le modifiche solo alle parti della pipeline dei pixel necessarie per il rendering.",
      },
      {
        type: 'paragraph',
        text: 'Potresti aver sentito il termine "rasterizza" utilizzato in combinazione con "dipingi". Questo accade perché la pittura è in realtà composta da due attività:',
      },
      {
        type: 'list',
        ordered: true,
        items: ['Creazione di un elenco di chiamate draw.', 'Riempimento dei pixel.'],
      },
      {
        type: 'paragraph',
        text: 'Quest\'ultima è chiamata "rasterizzazione", quindi ogni volta che vedi record di pittura in DevTools, devi pensare che includa la rasterizzazione. In alcune architetture, la creazione dell\'elenco delle chiamate di disegno e della rasterizzazione avviene su thread diversi, ma non è sotto il tuo controllo in qualità di sviluppatore.',
      },
      {
        type: 'paragraph',
        text: "Non è sempre necessario modificare ogni parte della pipeline in ogni frame. In effetti, quando apporti una modifica visiva, con JavaScript, CSS o l'API Web Animations, la pipeline viene eseguita normalmente in tre modi per un determinato frame.",
      },
      {
        type: 'subheading',
        level: 3,
        text: '1. JS / CSS &gt; Stile &gt; Layout &gt; Pittura &gt; Composito',
      },
      {
        type: 'paragraph',
        text: 'Se modifichi una proprietà "layout", ad esempio una che modifica la geometria di un elemento come larghezza, altezza o posizione (ad esempio le proprietà CSS left o top), il browser deve controllare tutti gli altri elementi e "riorganizzare" la pagina. Le aree interessate dovranno essere ridipinte e gli elementi dipinti finali dovranno essere ricomponiti.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '2. JS / CSS &gt; Stile &gt; Pittura &gt; Composito',
      },
      {
        type: 'paragraph',
        text: 'Se hai modificato una proprietà "solo pittura" per un elemento in CSS, ad esempio proprietà come background-image, color o box-shadow, il passaggio di layout non è necessario per applicare un aggiornamento visivo alla pagina. Se possibile, omettendo il passaggio di layout, eviti un lavoro di layout potenzialmente costoso che altrimenti avrebbe contribuito a una latenza significativa nella produzione del frame successivo.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '3. JS / CSS &gt; Stile &gt; Composito',
      },
      {
        type: 'paragraph',
        text: 'Se modifichi una proprietà che non richiede né layout né pittura, il browser può passare direttamente al passaggio di composizione. Si tratta del percorso più economico e auspicabile nella pipeline dei pixel per i punti di alta pressione nel ciclo di vita di una pagina, ad esempio animazioni o scorrimento. Curiosità: Chromium ottimizza lo scorrimento della pagina in modo che si verifichi solo nel thread del compositore, se possibile. Ciò significa che, anche se una pagina non risponde, puoi comunque scorrerla e vedere le parti che sono state precedentemente disegnate sullo schermo.',
      },
      {
        type: 'paragraph',
        text: "Le prestazioni web sono l'arte di evitare il lavoro, aumentando al contempo al massimo l'efficienza di qualsiasi lavoro necessario. In molti casi, si tratta di lavorare con il browser, non contro di esso. Vale la pena ricordare che il lavoro precedentemente mostrato nella pipeline è diverso in termini di costo computazionale; alcune attività sono intrinsecamente più costose di altre.",
      },
      {
        type: 'paragraph',
        text: "Diamo un'occhiata alle diverse parti della pipeline. Esamineremo i problemi comuni e come diagnosticarli e risolverli.",
      },
      {
        type: 'paragraph',
        text: 'Le prestazioni sono importanti per gli utenti e, per creare esperienze utente positive, gli sviluppatori web devono creare siti web che reagiscono rapidamente alle interazioni degli utenti e si visualizzano senza problemi. Paul Lewis, esperto di prestazioni, è a tua disposizione per aiutarti a eliminare il jitter e creare app web che mantengono un rendimento di 60 frame al secondo. Al termine di questo corso avrai a disposizione gli strumenti necessari per profilare le app e identificare le cause di un rendimento del rendering non ottimale. Esplorerai anche la pipeline di rendering del browser e scoprirai pattern che ti consentiranno di creare più facilmente siti web veloci che gli utenti troveranno piacevoli da usare.',
      },
      {
        type: 'paragraph',
        text: 'Si tratta di un corso senza costi offerto tramite Udacity e puoi parteciparvi in qualsiasi momento.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
