class Food {
  constructor() {
    // коорд где храниться еда
    this.x = null;
    this.y = null;
  }

  /**
   *! Метод init получает другие игровые объекты, которые нужны ему для работы.
   * @param {Settings} settings объект настроек
   * @param {Snake} snake объект змейки
   * @param {Board} board объект игрового поля
   */
  //! через метод init мы будем передовать в какойто объект сылки на др объекты.
  //! 1 Мы так конролим от чего зависит наш файл. Видно в самом init
  //! 2 Более низкая связаность файлов, благодаря собственым свойствам (this.settings,this.board и пр.)
  // настройки - чтоб знала размеры игрвого поля и не появилась за его пределами; змейка - чтоб еда не появилась на ней; игровое поле - чтоб отрисовала еду
  init(settings, snake, board) {
    this.settings = settings;
    this.snake = snake;
    this.board = board;
  }

  /**
   *! Метод устанавливает новое случайное положение еды на игровом поле.
   */
  setNewFood() {
    // перемен. coords = генерируем случайные коорд с едой
    const coords = this.generateRandomCoordinates();
    // игровому полю передает коорд для отрисовки
    this.board.renderFood(coords);
  }

  /**
   *! Метод устанавливает на игровом поле еду по текущим координатам.
   */
  setFood() {
    // в метод renderFood предает коорд еды
    this.board.renderFood(this);
  }

  /**
   *! Метод генерирует новый объект еды со случайным положением на игровом поле
   * @returns {Food}
   */
  generateRandomCoordinates() {
    while (true) {
      //! получаем коорд Х
      // this.x = случайное число (Math.random()(случайное число от 0 до 1, 1 не включая)) умножаем на число колонок (this.settings.colsCount)(чтоб не выходило за пределы поля), прибавляем 1 (для начала - нумерация начинаеться с 1, нет нулевого элемента, и для конца(захватить последнию колонку)) и отбрасываем дробную часть (Math.floor)
      this.x = Math.floor(Math.random() * this.settings.colsCount + 1);
      //! получаем коорд Y
      this.y = Math.floor(Math.random() * this.settings.rowsCount + 1);
      // по этим коорд получим ячейку
      let cell = this.board.getCellEl(this.x, this.y);
      // проверяем ячейку на присутствие значений
      if (cell === null) {
        // если их нет, цикл запускается заново
        continue;
      }
      // проверяем не явлеется ли она телом змейки
      if (cell.classList.contains("snakeBody")) {
        continue;
      }
      // возрашает рандом. коорд. еды
      return this;
    }
  }
}
