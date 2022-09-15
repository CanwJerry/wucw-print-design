export const companyInfo = {
    "code": 0,
    "msg": "success",
    "data": {
        "name": "测试公司",
        "address": "测试地址",
        "contactPerson": "张三",
        "contactPumber": "15212345678/138123456781",
        "tel": "0821-1234567"
    }
}

export const externalManage = {
    "code": 0,
    "msg": "success",
    "data": {
        "delegateExternalSendNo": "WW20220913000008",
        "pNo": "GYS20220623000001",
        "pName": "阿里巴巴",
        "warehouseID": "7661d5a5-066c-4c08-a5f1-92091499b8c6",
        "warehouseName": "总仓",
        "delegateExternalCount": 9,
        "delegateExternalAmount": 0,
        "status": 1,
        "strStatus": "已审核",
        "sendCount": 9,
        "createDate": "2022-09-13 18:06:38",
        "remarks": "",
        "matters": [
            {
                "delegateExternalSendDetailID": 2335,
                "delegateExternalDemandID": 0,
                "matterID": "6f2177b6-2b82-4d7f-88e8-9dd655dbe7c6",
                "matterNo": "000058",
                "matterName": "委外0",
                "unit": "",
                "specifications": "",
                "matterShortName": "委外0",
                "unitPrice": 0,
                "remark": null,
                "amount": 0,
                "qty": 9,
                "child": [
                    {
                        "matterID": "8d35cedd-eff7-4696-b04c-c7120588b96b",
                        "matterNo": "000057",
                        "matterName": "采购00",
                        "unit": "",
                        "specifications": "",
                        "demandCount": 9,
                        "needCount": 1,
                        "stock": 16,
                        "remark": null,
                        "matterShortName": "采购00"
                    }
                ]
            }
        ],
        "logs": [
            {
                "sourceNO": "WWRK20220913000007",
                "userName": "工厂老板",
                "operationTime": "2022-09-13 18:07:00",
                "action": "保存并审核委外入库单",
                "describe": "工厂老板 于 2022-09-13 18:07:00 执行了 保存并审核委外入库单 操作"
            },
            {
                "sourceNO": "WW20220913000008",
                "userName": "工厂老板",
                "operationTime": "2022-09-13 18:06:38",
                "action": "保存并审核委外发货单",
                "describe": "工厂老板 于 2022-09-13 18:06:38 执行了 保存并审核委外发货单 操作 "
            }
        ]
    }
}