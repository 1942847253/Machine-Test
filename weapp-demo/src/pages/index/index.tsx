/* eslint-disable jsx-quotes */
import { Component } from "react";
import { Popup, Button, Dialog } from "@taroify/core";
import { View } from "@tarojs/components";
import Calendar from "../../components/Calendar/Calendar";
import "./index.less";

let dataList: string[] = [];
export default class Index extends Component {
  public state = {
    isOpen: false,
    showMessage: false,
  };

  private openCalendar = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  private openMessage = () => {
    this.setState({ showMessage: !this.state.showMessage });
  };

  private checkedDate = (dateArr: string[]) => {
    dataList = dateArr;
  };

  public alertDate() {
    this.openCalendar();
    this.openMessage();
  }

  render() {
    const { isOpen, showMessage } = this.state;
    return (
      <View className="index">
        <Button
          onClick={() => this.openCalendar()}
          color="primary"
          className="btn"
        >
          打开日历
        </Button>
        <Popup
          open={isOpen}
          rounded
          placement="bottom"
          style={{ height: "65%" }}
        >
          <Popup.Backdrop onClick={() => this.openCalendar()}></Popup.Backdrop>
          <Calendar checkedDate={this.checkedDate} />
          <Button
            shape="round"
            style={{ width: "90%", marginLeft: "20px", marginBottom: "10px" }}
            onClick={() => this.alertDate()}
            color="primary"
          >
            显示选择的日期
          </Button>
        </Popup>
        <Dialog open={showMessage} onClose={() => this.openMessage()}>
          <Dialog.Content>
            {dataList[0] ? dataList.join(",  ") : "请先选择"}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onClick={() => this.openMessage()}>确认</Button>
          </Dialog.Actions>
        </Dialog>
      </View>
    );
  }
}
