import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../utils/config/device";
//import { getStyles } from "./devices.style";

//const styles = getStyles(hmSetting.getDeviceInfo().deviceName);
const { messageBuilder } = getApp()._options.globalData;
const vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE);

Page({
  onInit(params) { },
  build() {
    hmUI.updateStatusBarTitle("Devices");
  },
  onDestroy() {
    vibrate && vibrate.stop();
    hmUI.setStatusBarVisible(true);
  },
  getAllDevices() {
    messageBuilder
      .request({
        func: "getAllDevices",
      })
      .then((data) => {
        const { devices = [] } = data;
        devices.push({ name: "", id: "" })

        devices.forEach((device, i) => {
          const { name = "", id = "" } = device;

          const widget = hmUI.createWidget(hmUI.widget.BUTTON, {
            y: px(DEVICE_HEIGHT * 0.36 + 80 * i),
            text: name,
            ...styles.TITLEBUTTON,
            click_func: () => {
              hmApp.gotoPage({
                url: "pages/playlist/playlist.page",
                param: JSON.stringify({
                  name: name,
                  playlistId: id,
                }),
              });
            },
          });
        });
      });
  },
});
