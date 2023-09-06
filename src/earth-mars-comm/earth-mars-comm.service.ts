import { Injectable } from '@nestjs/common';
import { send } from 'process';

@Injectable()
export class CommunicationService {
    Earth = 'earth'
    Mars = 'mars'

    charsToNumberMapping = ["2", "22", "222",
       "3", "33", "333",
       "4", "44", "444",
       "5", "55", "555",
       "6", "66", "666",
       "7", "77", "777", "7777",
       "8", "88", "888",
       "9", "99", "999", "9999", "*", "#"];

    numberToCharacterMapping = [ "", "", "ABC", "DEF", "GHI", "JKL",
       "MNO", "PQRS", "TUV", "WXYZ" ]

    earthToMars(message){
        try {
            let output = "";
       
            // length of input string
            let n = message.length;
            for (let i = 0; i < n; i++)
            {
                let letterOfMessage = message[i]
                // Checking for space
                if (letterOfMessage == ' ')
                    output = output + " ";
                // NOTE: not using 0 for space. We can use 0 number for space
                else if (letterOfMessage == '*' || letterOfMessage == '#') {
                    output = output + this.charsToNumberMapping[message[i] == '*' ? 26 : 27] + '.';
                }
                else if (letterOfMessage.match(/[a-z]/i) || letterOfMessage.match(/[A-Z]/i))
                {
                    // Calculating index for each character
                    let position = message[i].charCodeAt(0) - 'A'.charCodeAt(0);
                    if (position > 25){
                        position = message[i].charCodeAt(0) - 'a'.charCodeAt(0);
                        output = output + this.charsToNumberMapping[position] + '.';
                    } else {
                        output = output + this.charsToNumberMapping[position] + '.';
                    }
                    // . is my spitter, adding spitter in response also. 
                }
                else {
                    console.log('Some letter in message is invalid [Logging in Logs]!!', letterOfMessage);
                }
            }
            
            return output;
        } catch (error) {
            console.error('Error in Sender and Receiver [Logging in Logs]!!', error.message);
            throw error
        }
    }

    MarsToEarth(message){
        try {
            var splittedMessage: [string] = message.split(".")
            let n = splittedMessage.length;
            var resultedString = ''
            for(let i = 0; i < n; i++){
                var currentLetter: string = splittedMessage[i]
                var isStartWithSpace = /^\s/.test(currentLetter)

                if(isStartWithSpace) {
                    // remove whilet space and add while space to output
                    currentLetter = currentLetter.trim()
                    resultedString += ' '
                } 

                if (!currentLetter || !currentLetter.match(/[0-9]/i)) {         // check if currentLetter is empty or current letter is not number
                    if (currentLetter[0] == '*' || currentLetter[0] == '#'){
                        resultedString += currentLetter[0] 
                    }
                    
                    console.log('No Digits in Letter [Logging in Logs]!!', currentLetter)
                    continue
                }

                let isAllCharSame = [...currentLetter].every( (x, _, a) => x === a[0])
                if (!isAllCharSame) {
                    console.log('Digits in message are not same [Logging in Logs]!!', currentLetter)
                    continue
                } else {
                    let currentLetterLength = [...currentLetter].length - 1
                    if (currentLetter[0] == '7' || currentLetter[0] == '9'){
                        resultedString += this.numberToCharacterMapping[currentLetter.charCodeAt(0) - 48][currentLetterLength % 4];
                    } else {
                        resultedString += this.numberToCharacterMapping[currentLetter.charCodeAt(0) - 48][currentLetterLength % 3];
                    }
                }
            } 
            return resultedString
        } catch (error) {
            console.log('Error in Sender and Receiver [Logging in Logs]!!', error.message);
            throw error
        }
    }

    identifySenderAndReciever(sender, receiver, message){
        try {
            [sender, receiver] = [String(sender).replace(/[^a-zA-Z ]/g, ""), String(receiver).replace(/[^a-zA-Z ]/g, "")] 

            if (sender && sender.toLowerCase() == this.Earth && receiver && receiver.toLowerCase() == this.Mars) {
                return this.earthToMars(message)
            } else if (sender && sender.toLowerCase() == this.Mars && receiver && receiver.toLowerCase() == this.Earth) {
                return this.MarsToEarth(message)
            } else {
                throw new Error('Sender or Receiver not Correct!!')
            }
        } catch (error) {
            console.log('Error in identifySenderAndReciever [Logging in Logs]!!', error.message);
            throw error
        }
    }
  
    myFunctions(header, body){
        return this.identifySenderAndReciever(header['x-sender'], header['x-receiver'], body?.message)
    }

    saveToDB(){
        console.log('saving to DB')
    }
}