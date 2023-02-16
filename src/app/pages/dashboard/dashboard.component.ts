import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import { DistributedItem } from './models/distributed-item.model';
import { MATERIAL_TYPES } from './models/enums/material-types.enum';
import { DistributedItemsService } from './services/distributed-items.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  availableDevices: MediaDeviceInfo[];
  deviceSelected: string;
  currentDevice: MediaDeviceInfo;
  lat: any;
  lng: any;
  foodBasket = MATERIAL_TYPES.FOODBASKET;
  blanket = MATERIAL_TYPES.BLANKET;
  water = MATERIAL_TYPES.WATER;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  PhotoScanned = false;
  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  torchEnabled = false;
  tryHarder = false;
  constructor(private distributedItemsService: DistributedItemsService, private cdr: ChangeDetectorRef) {
    this.getLocation();
  }
  ngAfterViewInit(): void {
    this.onDeviceSelectChange('');
  }
  clearResult(): void {
    this.qrResultString = '';
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    console.log('onCamerasFound');
    //this.currentDevice = this.availableDevices.find((x) => x.deviceId === "ba62bd7254e60f2ff917ba714c598a42924340489865ed44dbdeeef3275a1978");
    this.hasDevices = Boolean(devices && devices.length);
    this.availableDevices = devices;
    let dev = this.availableDevices[0];
    console.log(dev);
    this.currentDevice = dev;
    this.cdr.detectChanges();
  }

  onCodeResult(resultString: string) {
    console.log(resultString);
    this.PhotoScanned = true;
    Object.values(MATERIAL_TYPES).forEach((item) => {
      if (resultString === item) {
      }
    });
    this.qrResultString = resultString;
  }

  onDeviceSelectChange(e:any) {
    console.log('onDeviceSelectChange');
    const device = this.availableDevices[0];//.find((x) => x.deviceId === selected);
    this.currentDevice = device;
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            console.log(
              'Latitude: ' +
                position.coords.latitude +
                'Longitude: ' +
                position.coords.longitude
            );
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            console.log(this.lat);
            console.log(this.lat);
          }
        },
        (error) => console.log(error)
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
  rescan() {
    this.PhotoScanned = false;
  }
  send() {
    const sendenItem: DistributedItem = {
      count: 1,
      date: new Date().toISOString(),
      lng: this.lng,
      lat: this.lat,
      itemName: this.qrResultString
    };
    console.log(sendenItem);
    this.distributedItemsService
      .addDistributedItem(sendenItem)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
