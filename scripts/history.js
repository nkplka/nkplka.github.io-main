//imports
import { createText, getInputValue } from "./functions.js";
//end imports
export async function commandHistory(){
    let record = JSON.parse(localStorage.getItem("history")) || [];
    if(record.length === 0){
        await createText("No History Found!");
    }else{
        await createText("Previously used commands are: ");
        for(let i=0;i<record.length;++i){
            await createText((i+1).toString() + ".) " + record[i]);
        }
        await createText("Чтобы запустить определенный cmd из истории, запустите history {id}, где id - это идентификатор этого cmd в истории")
    }
}

export async function runSpecificHistoryCmd(id) {
    let record = JSON.parse(localStorage.getItem("history")) || [];
    if (id < 1 || id > record.length) {
        await createText("История этого идентификатора не найдена!");
    } else {
        await createText(`command: ${record[id-1]}`);
        await getInputValue(record,false,record[id-1]);
    }
}

export function saveHistory(value){
    let record = JSON.parse(localStorage.getItem("history")) || [];
    if(value.startsWith('history')) return;
    if(record.length > 9){
        record.shift();
        record.push(value);
    }else{
        record.push(value);
    }
    localStorage.setItem("history", JSON.stringify(record));
}


export async function clearHistory(){
    let record = JSON.parse(localStorage.getItem("history")) || [];
    await createText("очистка хистори");
    record = [];
    localStorage.setItem("history", JSON.stringify(record));
}

export function popInvalidCommand(){
    let record = JSON.parse(localStorage.getItem("history")) || [];
    record.pop();
    localStorage.setItem("history", JSON.stringify(record));
}
