deviceName = 'farm';

defineVirtualDevice(deviceName, {
    title: {'en': 'Farm', 'ru': 'Ферма'},
    cells: {
      mode: {
        title: {'en': 'Mode', 'ru': 'Режим'},
        type: 'value',
        value: 1,
        enum: {
          1: {'en': 'Auto', 'ru': 'Авто'},
          2: {'en': 'Dosage', 'ru': 'Дозация'},
          3: {'en': 'Check', 'ru': 'Проверка'},
        },
        readonly: false,
      },
      ph: {
        title: "pH",
        type: "value",
        value: null,
      },
      ec: {
        title: "EC",
        type: "value",
        value: null,
      },
      water: {
        title: {'en': "Water level", 'ru': 'Уровень воды'},
        type: 'value',
        value: 4,
        enum: {
          1: {'en': 'Full', 'ru': 'Полный'},
          2: {'en': 'Half', 'ru': 'Половина'},
          3: {'en': 'Empty', 'ru': 'Пустой'},
          4: {'en': 'Error', 'ru': 'Ошибка'}
        },
        readonly: false,
      }
    }
});

defineRule({
  whenChanged: ["wb-adc/A1"],
  then: function(newValue, devName, cellName) {
    dev[devName+'/ph'] = newValue;
  }
});

defineRule({
  whenChanged: ["wb-adc/A2"],
  then: function(newValue, devName, cellName) {
    dev[devName+'/ec'] = newValue;
  }
});

defineRule({
  whenChanged: ["wb-gpio/W1_IN", "wb-gpio/W2_IN"],
  then: function() {
      if (dev["wb-gpio/W1_IN"] == 0) {
        if (dev["wb-gpio/W2_IN"] == 1) {
          dev[devName+'/water'] = 4
        } else {
          dev[devName+'/water'] = 3
        }
      } else {
        if (dev["wb-gpio/W2_IN"] == 1) {
          dev[devName+'/water'] = 1
        } else {
          dev[devName+'/water'] = 2
        }
      }
  }
});
