/**some app to play pipa sounds on the keyboard 
 * 1. play sounds upon pressing key (yay functionality done)
 * 2. change key 
 * 3. tremolo 
*/
const major = "A"; 
const default_note = 16; 
const num_to_note = {
    1: "A2", 
    2: "A#2", 
    3: "B2", 
    4: "C3", 
    5: "C#3", 
    6: "D3", 
    7: "D#3", 
    8: "E3", 
    9: "F3", 
    10: "F#3", 
    11: "G3", 
    12: "G#3", 
    13: "A3", 
    14: "A#3", 
    15: "B3", 
    16: "C4", 
    17: "C#4", 
    18: "D4", 
    19: "D#4", 
    20: "E4", 
    21: "F4", 
    22: "F#4", 
    23: "G4", 
    24: "G#4", 
    25: "A4", 
    26: "A#4", 
    27: "B4", 
    28: "C5", 
    29: "C#5", 
    30: "D5",  
    31: "D#5", 
    32: "E5", 
    33: "F5", 
    34: "F#5", 
    35: "G5", 
    36: "G#5", 
    37: "A5", 
    38: "A#5", 
    39: "B5", 
    40: "C6", 
    41: "C#6", 
    42: "D6", 
    43: "E6"
}

const major_list = ["A", "Bb", "C", "D", "Eb", "E", "F", "G"]; 

const major_to_first_note = {
    "A": 1, 
    "Bb": 26, 
    "C": 16, 
    "D": 18, 
    "Eb": 19, 
    "E": 20, 
    "F": 21, 
    "G": 23, 
}

var first_note = major_to_first_note[major]; 

function raise_octave(first_note) {
    if (first_note + 12 <= 19){
        return first_note + 12;
    } else {
        alert("Reached limit!");
    } 
}

function decrease_octave(first_note){ 
    if (first_note - 12 >= 13){
        return first_note - 12
    } else {
        alert("Cannot decrease anymore!"); 
    }
}

function increase_key(major){
    let index = major_list.indexOf(major); 
    index = (index + 1) % major_list.length; 
    return major_list[index]; 
}

function decrease_key(major){
    let index = major_list.indexOf(major); 
    index = (index - 1) % major_list.length; 
}

//program the notes into the keyboard 
/** Q is 1, and so on, P is 2 of the higher octave. Returns an integer which maps to a note according to num_to_note property */
//ok i probably need to check for out of range for this 
function keyPressed(e){
    let note; 
    switch(e.code){
        //doh 
        case "KeyQ": 
            note = first_note;
            break; 
        //doh sharp 
        case "Digit2": 
            note = first_note + 1; 
            break; 
        //rei 
        case "KeyW": 
            note = first_note + 2; 
            break;
        //rei sharp 
        case "Digit3":
            note = first_note + 3; 
            break; 
        //mi 
        case "KeyE": 
            note = first_note + 4; 
            break;
        //fa 
        case "KeyR": 
            note = first_note + 5; 
            break; 
        //fa sharp 
        case "Digit5":
            note = first_note + 6;
            break; 
        //soh
        case "KeyT": 
            note = first_note + 7; 
            break; 
        //soh sharp 
        case "Digit6":
            note = first_note + 8;
            break; 
        //la 
        case "KeyY":
            note = first_note + 9; 
            break; 
        //la sharp 
        case "Digit7": 
            note = first_note + 10; 
            break; 
        //ti 
        case "KeyU":
            note = first_note + 11; 
            break; 
        //doh (higher octave)
        case "KeyI":
            note = first_note + 12; 
            break; 
        //doh sharp (higher octave)
        case "Digit9":
            note = first_note + 13; 
            break; 
        //rei (higher octave)
        case "KeyO": 
            note = first_note + 14; 
            break;
        //rei sharp (higher octave)
        case "Key0":
            note = first_note + 15; 
            break;  
        //mi (higher octave)
        case "KeyP": 
            note = first_note + 16; 
            break; 
    }   
    return note; 
}

function playNote(e){
    var myMusic = new Audio();
    //get the number reprensentative of the note 
    let note = keyPressed(e); 
    console.log("Note number:" + note);
    //find the note from the number 
    let note_name = num_to_note[note];
    console.log("Note name:" + note_name);
    myMusic.src = "./sounds/" + note_name + ".m4a"
    myMusic.play(); 
}

window.onload = () => {    
    //KeyListener 
    document.addEventListener('keydown', playNote); 
}