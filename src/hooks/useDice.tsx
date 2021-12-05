import { stringify } from "querystring";
import { useState } from "react";


export function useDice() {

    const [dice, setDice] = useState<number[]>([]);
    const [diceStats, setDiceStats] = useState(new Map<string, number>());

    const setupDice = (numberOfDice: number) => {
        setDice(Array.from({ length: numberOfDice }, () => 0));
    }

    const rollAllDice = () => {
        setDice(Array.from({ length: dice.length }, () => Math.floor(Math.random() * 6) + 1));
        console.log(dice);

        setDiceStats(new Map<string, number>());

        diceStats.set("1", 0);
        diceStats.set("2", 0);
        diceStats.set("3", 0);
        diceStats.set("4", 0);
        diceStats.set("5", 0);
        diceStats.set("6", 0);

        dice.map((v, i) => {
            console.log(v, i);
            diceStats.set(`${v}`, diceStats.get(`${v}`) || 0 + 1);
        });
    }

    const rollUp = (up: number) => {
        const upDice = dice.map((v, i) => {
            if (v >= up) {
                return v;
            }
        });
        console.log(upDice);
    }

    return {
        dice,
        setupDice,
        rollAllDice,
        rollUp,
        diceStats,
    }
}