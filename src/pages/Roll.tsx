import { IonBadge, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonItemDivider, IonPage, IonRange, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { expand, radioButtonOffSharp, radioButtonOn } from 'ionicons/icons';
import { useEffect, useState } from 'react';


const Roll: React.FC = () => {

  const [numberOfDice, setNumberOfDice] = useState<number>(4);

  const [dice, setDice] = useState<number[]>([]);
  const [rolled, setRolled] = useState<boolean>(false);
  const [valueCount, setValueCount] = useState(new Map<string, number>());
  const [upDice, setUpDice] = useState(new Map<string, number>());
  const [upValue, setUpValue] = useState<number>();
  const [lastRolls, setLastRolls] = useState<number[][]>(Array.from({ length: 0 }));

  const clearDice = (numberOfDice: number) => {
    setRolled(false);
    setUpValue(7);
    setDice(Array.from({ length: numberOfDice }, () => 0));
  }

  const rerollbyIndex = (index: number) => {
    let _dice = [...dice];
    const oldValue = _dice[index];
    const newValue = Math.floor(Math.random() * 6) + 1;
    _dice[index] = newValue;
    setDice(_dice);
    calcDice(_dice);
  };

  const setDiceAndReroll = (_numberOfDice = 0, _upValue = 0) => {
    setUpValue(_upValue)
    setNumberOfDice(_numberOfDice);
  }

  const calcDice = (newDice: any[]) => {
    let _upDice = new Map<string, number>();
    let _valueCount = new Map<string, number>();

    for (let f = 1; f <= 6; f++) {
      _valueCount.set(`${f}`, 0);
      _upDice.set(`${f}+`, 0);
    }

    newDice.map((v, i) => {
      console.log("dice", i, "value=", v)
      _valueCount.set(`${v}`, (_valueCount.get(`${v}`) || 0) + 1)
      for (let f = 1; f <= 6; f++) {

        if (v >= f) {
          _upDice.set(`${f}+`, (_upDice.get(`${f}+`) || 0) + 1)
        }
      }

      setUpDice(_upDice);
      setValueCount(_valueCount);
    })
  }


  const rollAllDice = () => {
    setUpValue(7);
    console.log(`rolling ${numberOfDice}d6...`)
    const newDice = Array.from({ length: numberOfDice }, () => Math.floor(Math.random() * 6) + 1);
    setDice(newDice);
    calcDice(newDice);

    setRolled(true);


  }

  const rollUp = (up: number) => {
    console.log("_upDice", up);
  }

  useEffect(() => {
    // clearDice(numberOfDice);

  }, [numberOfDice])


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Roll</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItemDivider>
          <h1>
            {numberOfDice}d6
          </h1>
        </IonItemDivider>
        <IonItem>
          <IonRange min={1} max={28} step={1} pin={true} value={numberOfDice} snaps={true}
            color="secondary"
            onIonChange={e => setNumberOfDice(e.detail.value as number)} />
        </IonItem>
        <IonItem>
          <IonButton onClick={rollAllDice}>Roll {numberOfDice}d6</IonButton>
          {upValue != 7 &&
            <IonButton onClick={e => setUpValue(7)}>clear {upValue}+ filter </IonButton>
          }
        </IonItem>

        <IonGrid>
          <IonRow>
            {dice.map((die, i) => {
              return (
                <IonCol key={i} size="2" style={{
                  outerHeight: 100
                }}>
                  {die === 0 &&
                    <>
                      [?]
                    </>
                  }
                  {die !== 0 &&
                    <>
                      <IonButton onClick={e => rerollbyIndex(i)} color={(die >= (upValue || 7) ? "danger" : "dark")} style={{
                        transform: `rotate(${(die + i) * 3 - (i * 2)}deg)`,
                        // margin: `${die * 4}px ${die * 2}px ${die * 5}px ${die * 3}px `
                      }}>
                        {die}

                      </IonButton>

                    </>
                  }
                </IonCol>
              )
            })}

          </IonRow>
          <IonItemDivider>
          </IonItemDivider>
          <IonRow>
            <IonCol>

              {rolled &&
                <IonRow>
                  <IonCol>
                    <IonButton onClick={e => setDiceAndReroll(upDice.get("1+") || 0, 1)}>1+ ({upDice.get("1+")}) </IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton onClick={e => setDiceAndReroll(upDice.get("2+") || 0, 2)}>2+ ({upDice.get("2+")}) </IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton onClick={e => setDiceAndReroll(upDice.get("3+") || 0, 3)}>3+ ({upDice.get("3+")}) </IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton onClick={e => setDiceAndReroll(upDice.get("4+") || 0, 4)}>4+ ({upDice.get("4+")}) </IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton onClick={e => setDiceAndReroll(upDice.get("5+") || 0, 5)}>5+ ({upDice.get("5+")}) </IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton onClick={e => setDiceAndReroll(upDice.get("6+") || 0, 6)}>6+ ({upDice.get("6+")}) </IonButton>
                  </IonCol>
                </IonRow>
              }
            </IonCol>
          </IonRow>
          {rolled &&

            <IonRow>
              <IonCol>
                1's = {valueCount.get("1")}
              </IonCol>
              <IonCol>
                2's = {valueCount.get("2")}
              </IonCol>
              <IonCol>
                3's =  {valueCount.get("3")}
              </IonCol>
              <IonCol>
                4's =  {valueCount.get("4")}
              </IonCol>
              <IonCol>
                5's =   {valueCount.get("5")}
              </IonCol>
              <IonCol>
                6's =   {valueCount.get("6")}
              </IonCol>
            </IonRow>
          }
          <IonItemDivider>

          </IonItemDivider>

          {lastRolls.forEach((d) => {
            <IonRow>
              <IonCol>
                d={d}
              </IonCol>
            </IonRow>
          })}

        </IonGrid>
      </IonContent >
    </IonPage >
  );
};

export default Roll;
