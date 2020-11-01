import React from 'react';
import { Colors, Config } from "./const";

type State = {
   isSorting: boolean
   initialArray: number[]
   elementsCount: number
   isReverse: boolean
}

/* Функция генерации массива данных, принимает на вход количество элементов */
const generateArray = (count: number) => {
   return new Array(count).fill(``).map(() => Math.floor(Math.random() * Config.maxValue))
}

class App extends React.Component<{}, State> {
   private readonly containerRef: React.RefObject<HTMLElement>;
   private sortedArray: number[];
   private sortingElements: null | JSX.Element[];

   constructor(props = {}) {
      super(props);

      this.state = {
         isReverse: false, // флаг, отвечающий за направление сортировки
         elementsCount: Config.defaultElementsCount, // количество элементов для генерации, изменяется пользователем
         isSorting: false, // флаг, следящий за тем, идет ли сортировка в данный момент времени
         initialArray: generateArray(Config.defaultElementsCount), // изначальный массив данных
      }

      this.containerRef = React.createRef() // реф, для работы с контейнером элементов
      this.sortedArray = [] // отсортированный массив
      this.sortingElements = this.generateSortingElements(this.state.initialArray) // jsx элементы для сортировки
   }

   componentDidUpdate(prevProps = {}, prevState: Readonly<State>) { // проверяем, изменился ли массив данных
      if (prevState.initialArray !== this.state.initialArray) { // если да, перерисовываем элементы с новыми данными
         this.sortingElements = this.generateSortingElements(this.state.initialArray)
         this.forceUpdate()
      }
   }

   render() {
      return (
         <div className="App">
            <header className="main-header">Сортировка пузырьком</header>
            <div className="data-wrapper">
               {/* Контейнер для элементов сортировки, считает ширину исходя из количества элементов */}
               <section className="data-container" ref={this.containerRef}
                        style={{ width: `${this.state.initialArray.length * 
                           (Config.elementWidth + Config.elementRightMargin)}px` }}>
                  {this.sortingElements}
               </section>
            </div>
            {/* Инпут ввода количества элементов проверяет значение и делает двухсторонний датабиндинг со стейтом */}
            <section className="controls">
               <input type="number" className="controls__number-input"
                      value={this.state.elementsCount} max={Config.maxElementsCount}
                      onChange={(e) => {
                         if (+e.target.value <= Config.maxElementsCount && +e.target.value > 0) {
                            this.setState({elementsCount: +e.target.value})
                         }
                      }}
               />
               {/* Радио кнопки переключают режимы сортировки */}
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
               {/* Кнопка генерации нового массива, обновляет массив в стейте и обновляет отсортированный */}
               <button className="controls__generate-button" disabled={this.state.isSorting} onClick={() => {
                  this.setState({ initialArray: generateArray(this.state.elementsCount) })
                  this.sortedArray = [];
                  }}>Сгенерировать
               </button>
               {/* Кнопка старта, при нажатии переводит приложение в режим активной сортировки, после резолва промиса
                переводит обратно в неактивный режим */}
               <button className="controls__start-button" onClick={() => {
                  this.setState({isSorting: true})
                  this.sortElements().then(() => this.setState({isSorting: false}))
               }} disabled={this.state.isSorting}>Начать
               </button>
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
      )
   };
   /* Функция, для генерации дом элементов, принимает на вход массив чисел, возвращает массив дом элементов */
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
   /* Функция меняющая местами 2 элемента, принимает их на вход, возвращает промис */
   swapElements = (leftElement: any, rightElement: any) => {
      return new Promise(resolve => {
         const styleLeft = window.getComputedStyle(leftElement);
         const styleRight = window.getComputedStyle(rightElement);
         const transformLeft = styleLeft.getPropertyValue("transform");
         // получаем стили отступов у элементов и присваиваем их друг другу, тем самым включая transition
         leftElement.style.transform = styleRight.getPropertyValue("transform");
         rightElement.style.transform = transformLeft;

         setTimeout(() => {
            //после завершения анимации меняем местами сами элементы в контейнере
            this.containerRef.current!.insertBefore(rightElement, leftElement);
            resolve();
         }, (Config.transitionSpeed * 1000 + 50));
         // для delay берем скорость из transition и добавляем 50мс,
         // что бы быть уверенным, что анимация завершилась
      });
   }
   /* Функция сортировки элементов, принимает на вход задержку сортировки между 2 элементами, возвращает промис */
   async sortElements(delay = Config.switchingDelay) {
      let elements = this.containerRef.current!
         .getElementsByClassName(`sorting-element`) as HTMLCollectionOf<HTMLElement>
      // получим с помощью рефа коллекцию элементов и обнулим итоговый массив
      this.sortedArray = []

      for (let i = 0; i < elements.length - 1; i++) {
         for (let j = 0; j < elements.length - i - 1; j++) {
            elements[j].style.backgroundColor = Colors.elementActive;
            elements[j + 1].style.backgroundColor = Colors.elementActive;
            // выделим активные элементы и вызовем задержку между сравнениями
            await new Promise(resolve => setTimeout(() => resolve(), delay));
            // найдем значения элементов
            const leftValue = +elements[j].querySelector(`p`)!.innerHTML;
            const rightValue = +elements[j + 1].querySelector(`p`)!.innerHTML;
            // проверяем направление сортировки и сравниваем значения между собой
            if (!this.state.isReverse) {
               if (leftValue > rightValue) {
                  await this.swapElements(elements[j], elements[j + 1]);
               }
            } else {
               if (leftValue < rightValue) {
                  await this.swapElements(elements[j], elements[j + 1]);
               }
            }
            // после завершения работы с элементами, возвращаем им дефолтный цвет
            elements[j].style.backgroundColor = Colors.elementDefault;
            elements[j + 1].style.backgroundColor = Colors.elementDefault;
         }
         // красим финальный элемент и пушим его в отсортированный массив
         this.sortedArray.push(Number(elements[elements.length - i - 1].querySelector(`p`)!.innerHTML))
         elements[elements.length - i - 1].style.backgroundColor = Colors.elementDone;
      }
      // пушим финальный элемент и переворачиваем массив
      // конечно, можно было бы обойтись методом .sort(), но такая сортировка выглядит честнее
      this.sortedArray.push(Number(elements[0].querySelector(`p`)!.innerHTML))
      this.sortedArray.reverse()
      elements[0].style.backgroundColor = Colors.elementDone;
   }
}

export default App;
