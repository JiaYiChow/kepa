//declare constants 
const DEFAULT_OCTAVE = 4; 
const DEFAULT_MAJOR = "C"; 
const DEFAULT_NOTE = 15; 
const NOTE_LIST = [ 
    "A2", "Bb2", "B2", "C3", "Db3", "D3", "Eb3", "E3", "F3", 
    "Gb3", "G3", "Ab3", "A3", "Bb3", "B3", "C4", "Db4", "D4", 
    "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4", 
    "C5", "Db5", "D5", "Eb5", "E5", "F5", "Gb5", "G5", "Ab5", 
    "A5", "Bb5", "B5", "C6", "Db6", "D6", "E6" 
]
const MAJOR_LIST = ["A", "Bb", "C", "D", "Eb", "E", "F", "G"]; 

var major = DEFAULT_MAJOR; 
var octave = DEFAULT_OCTAVE;  
var first_note = DEFAULT_NOTE;

/** Sets first_note according to global variables octave and 
 *  major. 
 *  Takes in no params and returns None. 
*/
function setFirstNote(){
    console.log("setFirstNote()"); 
    let string = major + octave; 
    first_note = NOTE_LIST.indexOf(string); 
    console.log("First_note: " + first_note); 
    return; 
}

/** Increments the global variable octave. Cannot go beyond 
 *  6 or else will have alert. Also updates first_note. Returns None.  
 */
function raise_octave() {
    if (octave < 6){
        octave++; 
        setFirstNote(); 
        console.log("Octave: " + octave); 
    } else {
        alert("Cannot increase anymore!");
    }
}
/** Decrements the global variable octave. Cannot go below 2 
 *  or else will have alert. Also updates first_note. Returns None. 
 */
function decrease_octave(){ 
    if (octave > 2){
        octave--; 
        setFirstNote();
        console.log("Octave: " + octave);
    } else {
        alert("Cannot decrease anymore!");
    }
}

/** Increases key. It changes the global variable major. 
 *  Updates first_note as well. Returns None. 
 */
function increase_key(){
    let index = MAJOR_LIST.indexOf(major);
    index = (index + 1) % MAJOR_LIST.length; 
    major = MAJOR_LIST[index];
    setFirstNote(); 
    console.log("Major: " + major); 
    return; 
}

/** Decreases key. It changes the global variable major. 
 *  Updates first_note as well. Returns None. 
 */
function decrease_key(){
    let index = MAJOR_LIST.indexOf(major); 
    console.log("Old index: " + index);
    index = (index - 1 + MAJOR_LIST.length) % (MAJOR_LIST.length);
    console.log("new index: " + index); 
    major = MAJOR_LIST[index];
    setFirstNote();
    console.log("Major: " + major); 
    return; 
}

/** Programs all the notes and implemented features into the keyboard. 
 *  Q is 1, and so on, P is 3 of the higher octave. For more 
 *  details refer to the diagram. 
 */
//ok i probably need to check for out of range for this 
function keyPressed(e){
    let note; 
    switch(e.code){
        //doh 
        case "KeyQ": 
            note = first_note;
            playNote(note);
            break; 
        //doh sharp 
        case "Digit2": 
            note = first_note + 1; 
            playNote(note);
            break; 
        //rei 
        case "KeyW": 
            note = first_note + 2; 
            playNote(note);
            break;
        //rei sharp 
        case "Digit3":
            note = first_note + 3; 
            playNote(note);
            break; 
        //mi 
        case "KeyE": 
            note = first_note + 4; 
            playNote(note);
            break;
        //fa 
        case "KeyR": 
            note = first_note + 5; 
            playNote(note);
            break; 
        //fa sharp 
        case "Digit5":
            note = first_note + 6;
            playNote(note);
            break; 
        //soh
        case "KeyT": 
            note = first_note + 7; 
            playNote(note);
            break; 
        //soh sharp 
        case "Digit6":
            note = first_note + 8;
            playNote(note);
            break; 
        //la 
        case "KeyY":
            note = first_note + 9; 
            playNote(note);
            break; 
        //la sharp 
        case "Digit7": 
            note = first_note + 10; 
            playNote(note);
            break; 
        //ti 
        case "KeyU":
            note = first_note + 11; 
            playNote(note);
            break; 
        //doh (higher octave)
        case "KeyI":
            note = first_note + 12; 
            playNote(note);
            break; 
        //doh sharp (higher octave)
        case "Digit9":
            note = first_note + 13; 
            playNote(note);
            break; 
        //rei (higher octave)
        case "KeyO": 
            note = first_note + 14; 
            playNote(note);
            break;
        //rei sharp (higher octave)
        case "Digit0":
            note = first_note + 15; 
            playNote(note);
            break;  
        //mi (higher octave)
        case "KeyP": 
            note = first_note + 16; 
            playNote(note);
            break; 
        //increase octave
        case "ArrowUp":
            raise_octave();
            break; 
        //decrease octave 
        case "ArrowDown":
            decrease_octave();
            break;
        //increase key 
        case "ArrowRight":
            increase_key();
            break; 
        case "ArrowLeft":
            decrease_key(); 
            break; 
        default: 
            break; 
    }   
}

function playNote(note_num){
    var myMusic = new Audio();
    //get the number reprensentative of the note 
    console.log("Note number:" + note_num);
    //find the note from the number 
    let note_name = NOTE_LIST[note_num];
    console.log("Note name:" + note_name);
    myMusic.src = "./sounds/" + note_name + ".m4a"
    myMusic.play(); 
}

window.onload = () => {    
    //KeyListener for notes 
    document.addEventListener('keydown', keyPressed); 
}