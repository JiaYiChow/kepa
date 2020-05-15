var major = "A"; 
const default_note = 16; 
const num_to_note = {
    1: "A2", 
    2: "A2_sharp", 
    3: "B2", 
    4: "C3", 
    5: "C3_sharp", 
    6: "D3", 
    7: "D3_sharp", 
    8: "E3", 
    9: "F3", 
    10: "F3_sharp", 
    11: "G3", 
    12: "G3_sharp", 
    13: "A3", 
    14: "A3_sharp", 
    15: "B3", 
    16: "C4", 
    17: "C4_sharp", 
    18: "D4", 
    19: "D4_sharp", 
    20: "E4", 
    21: "F4", 
    22: "F4_sharp", 
    23: "G4", 
    24: "G4_sharp", 
    25: "A4", 
    26: "A4_sharp", 
    27: "B4", 
    28: "C5", 
    29: "C5_sharp", 
    30: "D5",  
    31: "D5_sharp", 
    32: "E5", 
    33: "F5", 
    34: "F5_sharp", 
    35: "G5", 
    36: "G5_sharp", 
    37: "A5", 
    38: "A5_sharp", 
    39: "B5", 
    40: "C6", 
    41: "C6_sharp", 
    42: "D6", 
    43: "E6"
}

const major_list = ["A", "Bb", "C", "D", "Eb", "E", "F", "G"]; 

const major_to_first_note = {
    "A": 25, 
    "Bb": 26, 
    "C": 16, 
    "D": 18, 
    "Eb": 19, 
    "E": 20, 
    "F": 21, 
    "G": 23, 
}

var first_note;
first_note = major_to_first_note[major]; 

function raise_octave(first_note) {
    if (first_note + 12 <= 43){
        first_note += 12
        console.log("new first note:" + first_note);
    } else {
        alert("Reached limit!");
    } 
    return first_note;
}

function decrease_octave(first_note){ 
    if (first_note - 12 >= 1){
        first_note -= 12;  
    } else {
        alert("Cannot decrease anymore!"); 
    }
    return first_note;
}

function increase_key(major){
    let index = major_list.indexOf(major); 
    index = (index + 1) % major_list.length; 
    let new_major = major_list[index]; 
    first_note = major_to_first_note[new_major];
    console.log("Index:" + index); 
    console.log("New major:" + new_major);
    console.log("New first_note:" + first_note);
    return new_major; 
}

function decrease_key(major){
    let index = major_list.indexOf(major); 
    index = ((index - 1) % (major_list.length)) + major_list;
    console.log("Index:" + index);
    let new_major = major_list[index];
    first_note = major_to_first_note[new_major]; 
    return new_major;
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
            first_note = raise_octave(first_note);
            break; 
        //decrease octave 
        case "ArrowDown":
            first_note = decrease_octave(first_note);
            break;
        //increase key 
        case "ArrowRight":
            major = increase_key(major);
            break; 
        case "ArrowLeft":
            major = decrease_key(major); 
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
    let note_name = num_to_note[note_num];
    console.log("Note name:" + note_name);
    myMusic.src = "./sounds/" + note_name + ".m4a"
    myMusic.play(); 
}



window.onload = () => {    
    //KeyListener for notes 
    document.addEventListener('keydown', keyPressed); 
    //KeyListener for octave/key change 
    //document.addEventListener('keydown', changeOctave);
}