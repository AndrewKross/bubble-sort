import React from 'react';
import {Colors, Config} from "../../const";

type State = {
    isSorting: boolean
    initialArray: number[]
    sortingElements: JSX.Element[] | null
    elementsCount: number
    isReverse: boolean
}

const generateArray = (count: number) => {
    return new Array(count).fill(``).map(() => Math.floor(Math.random() * Config.maxValue))
}

class App extends React.Component<{}, State> {
    private readonly containerRef: React.RefObject<HTMLElement>;
    private sortedArray: number[];

    constructor(props = {}) {
        super(props);

        this.state = {
            isReverse: false,
            elementsCount: Config.defaultElementsCount,
            isSorting: false,
            initialArray: generateArray(Config.defaultElementsCount),
            sortingElements: null
        }

        this.containerRef = React.createRef()
        this.sortedArray = []
    }

    componentDidMount() {
        this.setState({
            sortingElements: this.generateSortingElements(this.state.initialArray)
        })
    }

    componentDidUpdate(prevProps = {}, prevState: Readonly<State>) {
        if (prevState.initialArray !== this.state.initialArray) {
            this.setState({sortingElements: this.generateSortingElements(this.state.initialArray)})
        }
    }

    render() {
      return(
      <div className="App">
          <header className="main-header">Сортировка пузырьком</header>
          <div className="data-wrapper">
              <section className="data-container" ref={this.containerRef}
                       style={{
                           width: `${this.state.initialArray.length * (Config.elementWidth + Config.elementRightMargin)}px`
                       }}>
                  {this.state.sortingElements}
              </section>
          </div>
          <section className="controls">

                  <input type="number" className="controls__number-input"
                         value={this.state.elementsCount} max={Config.maxElementsCount}
                         onChange={(e) => {
                          if (+e.target.value <= Config.maxElementsCount && +e.target.value > 0) {
                              this.setState({elementsCount: +e.target.value})
                          }
                      }
                  }/>
                  <div className="controls__radio-wrapper">
                      <div>
                          <input type="radio" checked={!this.state.isReverse} name="sort" id="sort1"
                                  onChange={() => this.setState({isReverse: false})}/>
                          <label htmlFor="sort1">По возрастанию</label>
                      </div>
                      <div>
                          <input type="radio" checked={this.state.isReverse} name="sort" id="sort2"
                                  onChange={() => this.setState({isReverse: true})}/>
                          <label htmlFor="sort2">По убыванию</label>
                      </div>
                  </div>
                  <button className="controls__generate-button" disabled={this.state.isSorting} onClick={() => {
                      this.setState({
                          initialArray: generateArray(this.state.elementsCount),
                      })
                      this.sortedArray = [];
                  }}>Сгенерировать</button>

              <button className="controls__start-button" onClick={() => {
                  this.setState({ isSorting: true })
                  this.sortElements()
                      .then(() => this.setState({ isSorting: false }))
              }} disabled={this.state.isSorting}>Начать</button>

              <div className="result">
                  <p>Изначальный массив: {this.state.initialArray.join(`, `)}</p>
                  <p>Отсортированный массив: {!this.state.isSorting && this.sortedArray.join(`, `)}</p>
              </div>
          </section>
          <p className="info">
              Нажмите на кнопку "Начать", что бы запустить процесс сортировки. <br/>
              Изначально генерируется массив из 10 элементов. <br/>
              Вы можете перегенерировать массив, указав любое другое количество элементов в поле ввода (до 45),
              и нажав кнопку "Сгенерировать". <br/>
              Так же, вы можете изменить порядок сортировки, выбрав один из двух вариантов.
          </p>
      </div>
  )};

    generateSortingElements = (data: number[]) => {
       return data.slice().map((it, i) => {
           const style = {
               height: `${it * Config.heightMultiplier}px`,
               transform: `translateX(${i * (Config.elementWidth + Config.elementRightMargin)}px)`,
               width: `${Config.elementWidth}px`,
               transition: `${Config.transitionSpeed}s all ease`,
           }
           return (
               <div key={Math.random()} className={`sorting-element`} style={style}>
                   <p>{it}</p>
               </div>
           )
       })
    }

    swapElements = (leftElement: any, rightElement: any) => {
        return new Promise(resolve => {
            const styleLeft = window.getComputedStyle(leftElement);
            const styleRight = window.getComputedStyle(rightElement);
            const transformLeft = styleLeft.getPropertyValue("transform");

            leftElement.style.transform = styleRight.getPropertyValue("transform");
            rightElement.style.transform = transformLeft;

            window.requestAnimationFrame(() => {
                setTimeout(() => {
                    this.containerRef.current!.insertBefore(rightElement, leftElement);
                    resolve();
                }, 250);
            });
        });
    }

    async sortElements(delay = Config.switchingDelay) {
        let elements = this.containerRef.current!
            .getElementsByClassName(`sorting-element`) as HTMLCollectionOf<HTMLElement>

        this.sortedArray = []

        for (let i = 0; i < elements.length - 1; i++) {
            for (let j = 0; j < elements.length - i - 1; j++) {
                elements[j].style.backgroundColor = Colors.elementActive;
                elements[j + 1].style.backgroundColor = Colors.elementActive;

                await new Promise(resolve =>
                    setTimeout(() => {
                        resolve();
                    }, delay)
                );

                const leftValue = Number(elements[j].querySelector(`p`)!.innerHTML);
                const rightValue = Number(elements[j + 1].querySelector(`p`)!.innerHTML);

                if (!this.state.isReverse) {
                    if (leftValue > rightValue) {
                        await this.swapElements(elements[j], elements[j + 1]);
                    }
                } else {
                    if (leftValue < rightValue) {
                        await this.swapElements(elements[j], elements[j + 1]);
                    }
                }

                elements[j].style.backgroundColor = Colors.elementDefault;
                elements[j + 1].style.backgroundColor = Colors.elementDefault;
            }
            this.sortedArray.push(Number(elements[elements.length - i - 1].querySelector(`p`)!.innerHTML))
            elements[elements.length - i - 1].style.backgroundColor = Colors.elementDone;
        }
        this.sortedArray.push(Number(elements[0].querySelector(`p`)!.innerHTML))
        this.sortedArray.reverse()
        elements[0].style.backgroundColor = Colors.elementDone;
    }
}

export default App;
