
Thông tin chung = {
  Configuration = {
    url: "https://auth.fiintrade.vn/.well-known/openid-configuration",
    response: {
      authorization_endpoint: "https://auth.fiintrade.vn/connect/authorize"
      backchannel_logout_session_supported: true
      backchannel_logout_supported: true
      check_session_iframe: "https://auth.fiintrade.vn/connect/checksession"
      claims_supported: ["sub"]
      code_challenge_methods_supported: ["plain", "S256"]
      device_authorization_endpoint: "https://auth.fiintrade.vn/connect/deviceauthorization"
      end_session_endpoint: "https://auth.fiintrade.vn/connect/endsession"
      frontchannel_logout_session_supported: true
      frontchannel_logout_supported: true
      grant_types_supported: ["authorization_code", "client_credentials", "refresh_token", "implicit", "password",…]
      id_token_signing_alg_values_supported: ["RS256"]
      introspection_endpoint: "https://auth.fiintrade.vn/connect/introspect"
      issuer: "https://auth.fiintrade.vn"
      jwks_uri: "https://auth.fiintrade.vn/.well-known/openid-configuration/jwks"
      request_parameter_supported: true
      response_modes_supported: ["form_post", "query", "fragment"]
      response_types_supported: ["code", "token", "id_token", "id_token token", "code id_token", "code token", "code id_token token"]
      revocation_endpoint: "https://auth.fiintrade.vn/connect/revocation"
      scopes_supported: ["openid", "FiinTrade.Core", "FiinTrade.Fundamental", "FiinTrade.Market", "FiinTrade.Price",…]
      subject_types_supported: ["public"]
      token_endpoint: "https://auth.fiintrade.vn/connect/token"
      token_endpoint_auth_methods_supported: ["client_secret_basic", "client_secret_post", "private_key_jwt"]
      userinfo_endpoint: "https://auth.fiintrade.vn/connect/userinfo"
    }
  }
  GetUserSettings = {
    url: "https://core.fiintrade.vn/UserSetting/GetUserSettings?language=vi",
    reponse: {
      items: [
        {
          contactMethod: "Both"
          firstTime: false
          fontSize: "Medium"
          language: "vi"
          marqueeOrganCodes: "[{"code":"VNINDEX","displayCode":"VNINDEX","isTicker":false},{"code":"HNXIndex","displayCode":"HNXIndex","isTicker":false},{"code":"UpcomIndex","displayCode":"UpcomIndex","isTicker":false},{"code":"VNXALL","displayCode":"VNXALL","isTicker":false},{"code":"VN30","displayCode":"VN30","isTicker":false},{"code":"HNX30","displayCode":"HNX30","isTicker":false}]"
          newsEmailSubscribed: true
          notificationEmailSubscribed: false
          notificationSubscribed: true
          theme: "Dark"
          timeFormat: "vn-VI"
          timeZone: "vietnamStandardTime"
          userId: 179
        }
      ],
      contactMethod: "Both"
      firstTime: false
      fontSize: "Medium"
      language: "vi"
      marqueeOrganCodes: "[{"code":"VNINDEX","displayCode":"VNINDEX","isTicker":false},{"code":"HNXIndex","displayCode":"HNXIndex","isTicker":false},{"code":"UpcomIndex","displayCode":"UpcomIndex","isTicker":false},{"code":"VNXALL","displayCode":"VNXALL","isTicker":false},{"code":"VN30","displayCode":"VN30","isTicker":false},{"code":"HNX30","displayCode":"HNX30","isTicker":false}]"
      newsEmailSubscribed: true
      notificationEmailSubscribed: false
      notificationSubscribed: true
      theme: "Dark"
      timeFormat: "vn-VI"
      timeZone: "vietnamStandardTime"
      userId: 179
      packageId: null
      page: 1
      pageSize: 0
      status: "Success"
      totalCount: 1
    }
  }
  UpdateUserSettings = {
    url: "https://core.fiintrade.vn/UserSetting/UpdateUserSettings",
    data: {
      contactMethod: "Email"
      firstTime: false
      fontSize: 1
      language: "vi"
      marqueeOrganCodes: "[{"code":"VNINDEX","displayCode":"VNINDEX","isTicker":false},{"code":"HNXIndex","displayCode":"HNXIndex","isTicker":false},{"code":"UpcomIndex","displayCode":"UpcomIndex","isTicker":false},{"code":"VNXALL","displayCode":"VNXALL","isTicker":false},{"code":"VN30","displayCode":"VN30","isTicker":false},{"code":"HNX30","displayCode":"HNX30","isTicker":false},{"code":"AAA","displayCode":"AAA","isTicker":true}]"
      newsEmailSubscribed: false
      notificationEmailSubscribed: false
      notificationSubscribed: false
      theme: "Light"
      timeFormat: "vn-VI"
      timeZone: "vietnamStandardTime"
      userId: 179
    }
    response: {
      errors: null
      status: "Success"
    }
  }
  GetAllCompanyGroup = {
    url: "https://core.fiintrade.vn/Master/GetAllCompanyGroup?language=vi",
    response: {
      errors: null
      items: [
        {
          calculateRatio: 0
          calculateRatioIcbIndustry: 0
          calculateReturn: 0
          calculateReturnIcbIndustry: 0
          comGroupCode: "AUDITOR"
          comGroupName: "Công ty kiểm toán"
          comGroupOrder: 1
          comGroupType: 1
          createDate: "2019-04-16T00:00:00"
          description: null
          friendlyName: null
          parentComGroupCode: "AUDITOR"
          priority: 0
          priorityIcbIndustry: 0
          status: 1
          updateDate: "2019-04-16T00:00:00"
        }
      ]
      packageId: null
      page: 1
      pageSize: 0
      status: "Success"
      totalCount: 57
    }
  }
  GetAllSystemAlerts = {
    url: "https://tools.fiintrade.vn/Alert/GetAllSystemAlerts?language=vi",
    reponse: {
      errors: null
      items: [
        {
          alertCode: "RevenueBreakoutQuarterly"
          alertGroupCode: "Notification.Fundamental"
          alertGroupName: "Cơ bản"
          alertId: 1
          alertName: "Bứt phá doanh thu (quý)"
          groupSubscribed: true
          subscribed: true
        }
      ]
      packageId: null
      page: 1
      pageSize: 0
      status: "Success"
      totalCount: 36
    }
  }
  GetAllDerivatives = {
    url: "https://core.fiintrade.vn/Master/GetAllDerivatives?language=vi",
    response: {
      errors: null
      items: [
        {
          bondCode: "GB05"
          bondStandard: "TPCP kỳ hạn 5 năm, mệnh giá 100.000 đồng, lãi suất danh nghĩa 5%, trả lãi định kỳ cuối  kỳ 12 tháng/lần, trả gốc một lần khi đáo hạn"
          comGroupCode: null
          corporatePositionLimit: 0
          createDate: "2019-07-03T00:00:00"
          dailyPayoutPriceMethod: null
          derivativeCode: "GB05F1912"
          derivativeName: "Hợp đồng tương lai TPCP kỳ hạn 05 năm tháng 12/2019"
          finalPayoutPriceMethod: null
          individualPositionLimit: 0
          isinCode: "VNGB05F19122"
          lastTradingDate: "2019-12-13T00:00:00"
          listingDate: "2019-07-04T00:00:00"
          marginRate: 0
          multiplier: 0
          orderLimit: 500
          organCode: null
          payoutDate: "2019-12-18T00:00:00"
          payoutMethodCode: "PHYSI"
          priceRange: 0.03
          professionalPositionLimit: 10000
          referencePrice: 0
          status: 1
          tickSize: 0
          tradeTypeCode: null
          tradingStatusCode: "TRAD"
          unitCode: "Point"
          updateDate: "2019-07-03T00:00:00"
        }
      ]
      packageId: null
      page: 1
      pageSize: 0
      status: "Success"
      totalCount: 6
    }
  }
  GetChartEconomy = {
    url: "https://core.fiintrade.vn/Master/GetAllChartEconomy?language=vi",
    response: {
      errors: null
      items: [
        {
          code: "CEMENTPRICE"
          level: 1
          name: "Cement Price"
          parentCode: null
        }
      ]
      packageId: null
      page: 1
      pageSize: 0
      status: "Success"
      totalCount: 36
    }
  }
  GetUserWatchLIst = {
    url: "https://core.fiintrade.vn/UserSetting/GetUserWatchList?language=vi",
    response: {
      errors: null
      items: [
        {
          code: "OIG"
          text: "Dầu khí"
          typeCode: "Sector"
          watchListId: 10
        }
      ]
      packageId: null
      page: 0
      pageSize: 0
      status: "Success"
      totalCount: 14
    }
  }
  GetNotificationList = {
    url: "https://tools.fiintrade.vn/Alert/GetNotificationList?language=vi&Page=1&PageSize=20&AlertType=Fundamental", //AlertType = [Fundamental, Event, Technical]
    response: {
      errors: null
      items: [
        {
          alertCode: "PriceDecrease"
          alertType: "Technical"
          createDate: "2019-10-10T09:30:21.303"
          message: "[5]"
          newsId: null
          notificationId: 77380
          organCode: "NHN"
          referenceId: "f0dedc25-d8ae-4b47-823c-e2b396df1550"
          status: 0
          ticker: "VHM"
          tradingDate: null
        }
      ]
      packageId: null
      page: 1
      pageSize: 20
      status: "Success"
      totalCount: 0
    }
  }
  GetPersonalSubribed = {
    url: "https://tools.fiintrade.vn/PersonalAlert/GetPersonalSubsribedAlerts?language=vi",
    response: {
      errors: null
      items: []
      packageId: null
      page: 1
      pageSize: 0
      status: "Success"
      totalCount: 0
    }
  }
  GetWorkspace = {
    url: "https://core.fiintrade.vn/UserSetting/GetWorkspace?language=vi&Name=CURRENT_WORKSPACE_NAME&IncludeThumbnail=false",
    reponse: {
      errors: null
      items: []
      packageId: null
      page: 1
      pageSize: 0
      status: "Success"
      totalCount: 0
    }
  }
  UpdateWorkspace = {
    url: "https://core.fiintrade.vn/UserSetting/UpdateWorkspace",
    data: {
      name: "CURRENT_WORKSPACE_NAME"
      workspace: "{"settings":{"hasHeaders":true,"constrainDragToContainer":false,"reorderEnabled":true,"selectionEnabled":false,"popoutWholeStack":false,"blockedPopoutsThrowError":true,"closePopoutsOnUnload":true,"showPopoutIcon":true,"showMaximiseIcon":true,"showCloseIcon":false,"responsiveMode":"onload","tabOverlapAllowance":0,"reorderOnTabMenuClick":true,"tabControlOffset":10},"dimensions":{"borderWidth":8,"borderGrabWidth":15,"minItemHeight":250,"minItemWidth":400,"headerHeight":26,"dragProxyWidth":250,"dragProxyHeight":150},"labels":{"close":"close","maximise":"maximise","minimise":"minimise","popout":"open in new window","popin":"pop in","tabDropdown":"additional tabs"},"content":[],"isClosable":true,"reorderEnabled":true,"title":"","openPopouts":[],"maximisedItemId":null,"data":{"FinancialStatement":{},"Strategy":{"FiintradeStrategy.currentTab":1,"currentTab":1},"Alerts":{"currentTab":2},"FASnapshot":{},"Watchlist":{"watchListId":10713,"sortedIds":null,"currentTab":2,"viewChart":false,"listHideColumnIndex":["priceInfo.foreignBuyVolumeMatched","priceInfo.foreignSellVolumeMatched","movingAveragePrice.daily","movingAveragePrice.weekly","movingAveragePrice.monthly","movingAveragePrice.quarterly","totalRank","extraFields.organShortName","extraFields.comGroupCode","priceInfo.dealPrice","priceInfo.totalDealVolume","priceInfo.totalDealValue","bidAsk.best1Bid","bidAsk.best1Offer","priceInfo.ceilingPrice","priceInfo.floorPrice","priceInfo.openPrice","priceInfo.highestPrice","priceInfo.lowestPrice","priceInfo.averagePrice","_52WRange","extraFields.highestPrice1Year","extraFields.lowestPrice1Year","priceInfo.matchVolume","priceInfo.matchValue","priceInfo.totalBuyTradeVolume","priceInfo.totalSellTradeVolume","priceInfo.foreignBuyVolumeTotal","priceInfo.foreignBuyValueTotal","priceInfo.foreignSellVolumeTotal","priceInfo.foreignSellValueTotal","priceInfo.foreignCurrentRoom","priceInfo.foreignNetValueTotal","extraFields.freeFloat","extraFields.freeFloatRate","extraFields.rtd19","extraFields.averageMatchVolume2Week","extraFields.averageMatchVolume1Month","extraFields.averageMatchVolume3Month","extraFields.averageMatchVolume1Year","performance.percentPriceChange1Week","performance.percentPriceChange1Month","performance.percentPriceChange3Month","performance.percentPriceChange1Year","organCode","priceInfo.tradingDate","bidAsk.best1BidVolume","bidAsk.best1OfferVolume","priceInfo.matchPrice"]},"MarketInDepth":{"currentTab":4,"liquidity.comGroupCode":"HNXIndex","prospect.currentTab":4},"TopVolume":{"typeTab":1,"indexTab":4},"TopBreakout":{"indexTab":2,"typeTab":5,"rate":"Two","dropdownTimeRange":"TwoWeeks"},"TopValue":{"indexTab":6,"typeTab":1},"Charting":{},"TASignals":{"Indicator.indicatorSearch":{"0":{"organCode":"BID","isinCode":"VN000000BID9","ticker":"BID","comGroupCode":"VNINDEX","icbCode":"8355","organTypeCode":"DN","comTypeCode":"NH","countryLocationCode":"VN","organName":"Ngân hàng Thương mại Cổ phần Đầu tư và Phát triển Việt Nam","organShortName":"BIDV","organFriendlyName":null,"status":1,"createDate":"2015-06-08T00:00:00","updateDate":"2019-04-26T10:35:39.19","displayCode":"BID","code":"BID","codeName":"BIDV","exchange":"HOSE","isTicker":true,"isBanking":true,"isInsurance":false},"1":{"organCode":"BVH","isinCode":"VN000000BVH3","ticker":"BVH","comGroupCode":"VNINDEX","icbCode":"8575","organTypeCode":"DN","comTypeCode":"BH","countryLocationCode":"VN","organName":"Tập đoàn Bảo Việt","organShortName":"Tập đoàn Bảo Việt","organFriendlyName":null,"status":1,"createDate":"2015-06-08T00:00:00","updateDate":"2019-08-05T08:55:59.097","displayCode":"BVH","code":"BVH","codeName":"Tập đoàn Bảo Việt","exchange":"HOSE","isTicker":true,"isBanking":false,"isInsurance":true},"2":{"organCode":"CTD","isinCode":"VN000000CTD4","ticker":"CTD","comGroupCode":"VNINDEX","icbCode":"2357","organTypeCode":"OTHER","comTypeCode":"CT","countryLocationCode":"VN","organName":"Công ty Cổ phần Xây dựng Coteccons","organShortName":"Xây dựng Coteccons","organFriendlyName":null,"status":1,"createDate":"2015-06-08T00:00:00","updateDate":"2019-09-25T09:25:12.407","displayCode":"CTD","code":"CTD","codeName":"Xây dựng Coteccons","exchange":"HOSE","isTicker":true,"isBanking":false,"isInsurance":false},"3":{"organCode":"CTG","isinCode":"VN000000CTG7","ticker":"CTG","comGroupCode":"VNINDEX","icbCode":"8355","organTypeCode":"OTHER","comTypeCode":"NH","countryLocationCode":"VN","organName":"Ngân hàng Thương mại Cổ phần Công thương Việt Nam","organShortName":"VietinBank","organFriendlyName":null,"status":1,"createDate":"2015-06-08T00:00:00","updateDate":"2019-05-04T11:13:55.653","displayCode":"CTG","code":"CTG","codeName":"VietinBank","exchange":"HOSE","isTicker":true,"isBanking":true,"isInsurance":false},"4":{"organCode":"DPM","isinCode":"VN000000DPM1","ticker":"DPM","comGroupCode":"VNINDEX","icbCode":"1357","organTypeCode":"OTHER","comTypeCode":"CT","countryLocationCode":"VN","organName":"Tổng Công ty Cổ phần Phân bón và Hóa chất Dầu khí","organShortName":"Đạm Phú Mỹ","organFriendlyName":null,"status":1,"createDate":"2015-06-08T00:00:00","updateDate":"2019-03-27T10:19:59.753","displayCode":"DPM","code":"DPM","codeName":"Đạm Phú Mỹ","exchange":"HOSE","isTicker":true,"isBanking":false,"isInsurance":false},"5":{"organCode":"EIB","isinCode":"VN000000EIB7","ticker":"EIB","comGroupCode":"VNINDEX","icbCode":"8355","organTypeCode":"OTHER","comTypeCode":"NH","countryLocationCode":"VN","organName":"Ngân hàng Thương mại Cổ phần Xuất nhập khẩu Việt Nam","organShortName":"Eximbank","organFriendlyName":null,"status":1,"createDate":"2015-06-08T00:00:00","updateDate":"2019-05-04T11:13:55.733","displayCode":"EIB","code":"EIB","codeName":"Eximbank","exchange":"HOSE","isTicker":true,"isBanking":true,"isInsurance":false}},"currentTab":3,"Deceptive.currentTabData":6},"News":{"currentTab":1},"TopNewLow":{"timeRange":"SixMonths"},"MarketCalendar":{"currentTab":1},"HeatMap":{"criteria":4,"exchange":2},"PriceDepth":{}}}"
      workspaceId: 20486
    },
    response: {
      errors: null
      status: "Success"
    }
  }
  NewWorkspace = {
    url: "https://core.fiintrade.vn/UserSetting/NewWorkspace",
    data: {
      description: ""
      isActive: true
      name: "abc"
      thumbnails: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAApEAAAESCAYAAACl544gAAAOqElEQVR4Xu3WoQ0AIBAEQSgDgaT/EiGhg/WD5s3kxM61zx0eAQIECBAgQIAAgSAwRWTQ8pUAAQIECBAgQOALiEhDIECAAAECBAgQyAIiMpM5IECAAAECBAgQEJE2QIAAAQIECBAgkAVEZCZzQIAAAQIECBAgICJtgAABAgQIECBAIAuIyEzmgAABAgQIECBAQETaAAECBAgQIECAQBYQkZnMAQECBAgQIECAgIi0AQIECBAgQIAAgSwgIjOZAwIECBAgQIAAARFpAwQIECBAgAABAllARGYyBwQIECBAgAABAiLSBggQIECAAAECBLKAiMxkDggQIECAAAECBESkDRAgQIAAAQIECGQBEZnJHBAgQIAAAQIECIhIGyBAgAABAgQIEMgCIjKTOSBAgAABAgQIEBCRNkCAAAECBAgQIJAFRGQmc0CAAAECBAgQICAibYAAAQIECBAgQCALiMhM5oAAAQIECBAgQEBE2gABAgQIECBAgEAWEJGZzAEBAgQIECBAgICItAECBAgQIECAAIEsICIzmQMCBAgQIECAAAERaQMECBAgQIAAAQJZQERmMgcECBAgQIAAAQIi0gYIECBAgAABAgSygIjMZA4IECBAgAABAgREpA0QIECAAAECBAhkARGZyRwQIECAAAECBAiISBsgQIAAAQIECBDIAiIykzkgQIAAAQIECBAQkTZAgAABAgQIECCQBURkJnNAgAABAgQIECAgIm2AAAECBAgQIEAgC4jITOaAAAECBAgQIEBARNoAAQIECBAgQIBAFhCRmcwBAQIECBAgQICAiLQBAgQIECBAgACBLCAiM5kDAgQIECBAgAABEWkDBAgQIECAAAECWUBEZjIHBAgQIECAAAECItIGCBAgQIAAAQIEsoCIzGQOCBAgQIAAAQIERKQNECBAgAABAgQIZAERmckcECBAgAABAgQIiEgbIECAAAECBAgQyAIiMpM5IECAAAECBAgQEJE2QIAAAQIECBAgkAVEZCZzQIAAAQIECBAgICJtgAABAgQIECBAIAuIyEzmgAABAgQIECBAQETaAAECBAgQIECAQBYQkZnMAQECBAgQIECAgIi0AQIECBAgQIAAgSwgIjOZAwIECBAgQIAAARFpAwQIECBAgAABAllARGYyBwQIECBAgAABAiLSBggQIECAAAECBLKAiMxkDggQIECAAAECBESkDRAgQIAAAQIECGQBEZnJHBAgQIAAAQIECIhIGyBAgAABAgQIEMgCIjKTOSBAgAABAgQIEBCRNkCAAAECBAgQIJAFRGQmc0CAAAECBAgQICAibYAAAQIECBAgQCALiMhM5oAAAQIECBAgQEBE2gABAgQIECBAgEAWEJGZzAEBAgQIECBAgICItAECBAgQIECAAIEsICIzmQMCBAgQIECAAAERaQMECBAgQIAAAQJZQERmMgcECBAgQIAAAQIi0gYIECBAgAABAgSygIjMZA4IECBAgAABAgREpA0QIECAAAECBAhkARGZyRwQIECAAAECBAiISBsgQIAAAQIECBDIAiIykzkgQIAAAQIECBAQkTZAgAABAgQIECCQBURkJnNAgAABAgQIECAgIm2AAAECBAgQIEAgC4jITOaAAAECBAgQIEBARNoAAQIECBAgQIBAFhCRmcwBAQIECBAgQICAiLQBAgQIECBAgACBLCAiM5kDAgQIECBAgAABEWkDBAgQIECAAAECWUBEZjIHBAgQIECAAAECItIGCBAgQIAAAQIEsoCIzGQOCBAgQIAAAQIERKQNECBAgAABAgQIZAERmckcECBAgAABAgQIiEgbIECAAAECBAgQyAIiMpM5IECAAAECBAgQEJE2QIAAAQIECBAgkAVEZCZzQIAAAQIECBAgICJtgAABAgQIECBAIAuIyEzmgAABAgQIECBAQETaAAECBAgQIECAQBYQkZnMAQECBAgQIECAgIi0AQIECBAgQIAAgSwgIjOZAwIECBAgQIAAARFpAwQIECBAgAABAllARGYyBwQIECBAgAABAiLSBggQIECAAAECBLKAiMxkDggQIECAAAECBESkDRAgQIAAAQIECGQBEZnJHBAgQIAAAQIECIhIGyBAgAABAgQIEMgCIjKTOSBAgAABAgQIEBCRNkCAAAECBAgQIJAFRGQmc0CAAAECBAgQICAibYAAAQIECBAgQCALiMhM5oAAAQIECBAgQEBE2gABAgQIECBAgEAWEJGZzAEBAgQIECBAgICItAECBAgQIECAAIEsICIzmQMCBAgQIECAAAERaQMECBAgQIAAAQJZQERmMgcECBAgQIAAAQIi0gYIECBAgAABAgSygIjMZA4IECBAgAABAgREpA0QIECAAAECBAhkARGZyRwQIECAAAECBAiISBsgQIAAAQIECBDIAiIykzkgQIAAAQIECBAQkTZAgAABAgQIECCQBURkJnNAgAABAgQIECAgIm2AAAECBAgQIEAgC4jITOaAAAECBAgQIEBARNoAAQIECBAgQIBAFhCRmcwBAQIECBAgQICAiLQBAgQIECBAgACBLCAiM5kDAgQIECBAgAABEWkDBAgQIECAAAECWUBEZjIHBAgQIECAAAECItIGCBAgQIAAAQIEsoCIzGQOCBAgQIAAAQIERKQNECBAgAABAgQIZAERmckcECBAgAABAgQIiEgbIECAAAECBAgQyAIiMpM5IECAAAECBAgQEJE2QIAAAQIECBAgkAVEZCZzQIAAAQIECBAgICJtgAABAgQIECBAIAuIyEzmgAABAgQIECBAQETaAAECBAgQIECAQBYQkZnMAQECBAgQIECAgIi0AQIECBAgQIAAgSwgIjOZAwIECBAgQIAAARFpAwQIECBAgAABAllARGYyBwQIECBAgAABAiLSBggQIECAAAECBLKAiMxkDggQIECAAAECBESkDRAgQIAAAQIECGQBEZnJHBAgQIAAAQIECIhIGyBAgAABAgQIEMgCIjKTOSBAgAABAgQIEBCRNkCAAAECBAgQIJAFRGQmc0CAAAECBAgQICAibYAAAQIECBAgQCALiMhM5oAAAQIECBAgQEBE2gABAgQIECBAgEAWEJGZzAEBAgQIECBAgICItAECBAgQIECAAIEsICIzmQMCBAgQIECAAAERaQMECBAgQIAAAQJZQERmMgcECBAgQIAAAQIi0gYIECBAgAABAgSygIjMZA4IECBAgAABAgREpA0QIECAAAECBAhkARGZyRwQIECAAAECBAiISBsgQIAAAQIECBDIAiIykzkgQIAAAQIECBAQkTZAgAABAgQIECCQBURkJnNAgAABAgQIECAgIm2AAAECBAgQIEAgC4jITOaAAAECBAgQIEBARNoAAQIECBAgQIBAFhCRmcwBAQIECBAgQICAiLQBAgQIECBAgACBLCAiM5kDAgQIECBAgAABEWkDBAgQIECAAAECWUBEZjIHBAgQIECAAAECItIGCBAgQIAAAQIEsoCIzGQOCBAgQIAAAQIERKQNECBAgAABAgQIZAERmckcECBAgAABAgQIiEgbIECAAAECBAgQyAIiMpM5IECAAAECBAgQEJE2QIAAAQIECBAgkAVEZCZzQIAAAQIECBAgICJtgAABAgQIECBAIAuIyEzmgAABAgQIECBAQETaAAECBAgQIECAQBYQkZnMAQECBAgQIECAgIi0AQIECBAgQIAAgSwgIjOZAwIECBAgQIAAARFpAwQIECBAgAABAllARGYyBwQIECBAgAABAiLSBggQIECAAAECBLKAiMxkDggQIECAAAECBESkDRAgQIAAAQIECGQBEZnJHBAgQIAAAQIECIhIGyBAgAABAgQIEMgCIjKTOSBAgAABAgQIEBCRNkCAAAECBAgQIJAFRGQmc0CAAAECBAgQICAibYAAAQIECBAgQCALiMhM5oAAAQIECBAgQEBE2gABAgQIECBAgEAWEJGZzAEBAgQIECBAgICItAECBAgQIECAAIEsICIzmQMCBAgQIECAAAERaQMECBAgQIAAAQJZQERmMgcECBAgQIAAAQIi0gYIECBAgAABAgSygIjMZA4IECBAgAABAgREpA0QIECAAAECBAhkARGZyRwQIECAAAECBAiISBsgQIAAAQIECBDIAiIykzkgQIAAAQIECBAQkTZAgAABAgQIECCQBURkJnNAgAABAgQIECAgIm2AAAECBAgQIEAgC4jITOaAAAECBAgQIEBARNoAAQIECBAgQIBAFhCRmcwBAQIECBAgQICAiLQBAgQIECBAgACBLCAiM5kDAgQIECBAgAABEWkDBAgQIECAAAECWUBEZjIHBAgQIECAAAECItIGCBAgQIAAAQIEsoCIzGQOCBAgQIAAAQIERKQNECBAgAABAgQIZAERmckcECBAgAABAgQIiEgbIECAAAECBAgQyAIiMpM5IECAAAECBAgQEJE2QIAAAQIECBAgkAVEZCZzQIAAAQIECBAgICJtgAABAgQIECBAIAuIyEzmgAABAgQIECBAQETaAAECBAgQIECAQBYQkZnMAQECBAgQIECAgIi0AQIECBAgQIAAgSwgIjOZAwIECBAgQIAAARFpAwQIECBAgAABAllARGYyBwQIECBAgAABAiLSBggQIECAAAECBLKAiMxkDggQIECAAAECBESkDRAgQIAAAQIECGQBEZnJHBAgQIAAAQIECIhIGyBAgAABAgQIEMgCIjKTOSBAgAABAgQIEBCRNkCAAAECBAgQIJAFRGQmc0CAAAECBAgQICAibYAAAQIECBAgQCALiMhM5oAAAQIECBAgQEBE2gABAgQIECBAgEAWEJGZzAEBAgQIECBAgICItAECBAgQIECAAIEsICIzmQMCBAgQIECAAAERaQMECBAgQIAAAQJZQERmMgcECBAgQIAAAQIi0gYIECBAgAABAgSygIjMZA4IECBAgAABAgREpA0QIECAAAECBAhkARGZyRwQIECAAAECBAg8D0hzdsZN/vwAAAAASUVORK5CYII="
      workspace: "{"settings":{"hasHeaders":true,"constrainDragToContainer":false,"reorderEnabled":true,"selectionEnabled":false,"popoutWholeStack":false,"blockedPopoutsThrowError":true,"closePopoutsOnUnload":true,"showPopoutIcon":true,"showMaximiseIcon":true,"showCloseIcon":false,"responsiveMode":"onload","tabOverlapAllowance":0,"reorderOnTabMenuClick":true,"tabControlOffset":10},"dimensions":{"borderWidth":8,"borderGrabWidth":15,"minItemHeight":250,"minItemWidth":400,"headerHeight":26,"dragProxyWidth":250,"dragProxyHeight":150},"labels":{"close":"close","maximise":"maximise","minimise":"minimise","popout":"open in new window","popin":"pop in","tabDropdown":"additional tabs"},"content":[],"isClosable":true,"reorderEnabled":true,"title":"","openPopouts":[],"maximisedItemId":null,"data":{"FinancialStatement":{},"Strategy":{"FiintradeStrategy.currentTab":4,"currentTab":1},"Alerts":{"currentTab":3,"expands":{"Notification.Fundamental":false}},"FASnapshot":{},"Watchlist":{"watchListId":10713,"sortedIds":null,"currentTab":2,"viewChart":false,"listHideColumnIndex":["priceInfo.foreignBuyVolumeMatched","priceInfo.foreignSellVolumeMatched","movingAveragePrice.daily","movingAveragePrice.weekly","movingAveragePrice.monthly","movingAveragePrice.quarterly","totalRank","extraFields.organShortName","extraFields.comGroupCode","priceInfo.dealPrice","priceInfo.totalDealVolume","priceInfo.totalDealValue","bidAsk.best1Bid","bidAsk.best1Offer","priceInfo.ceilingPrice","priceInfo.floorPrice","priceInfo.openPrice","priceInfo.highestPrice","priceInfo.lowestPrice","priceInfo.averagePrice","_52WRange","extraFields.highestPrice1Year","extraFields.lowestPrice1Year","priceInfo.matchVolume","priceInfo.matchValue","priceInfo.totalBuyTradeVolume","priceInfo.totalSellTradeVolume","priceInfo.foreignBuyVolumeTotal","priceInfo.foreignBuyValueTotal","priceInfo.foreignSellVolumeTotal","priceInfo.foreignSellValueTotal","priceInfo.foreignCurrentRoom","priceInfo.foreignNetValueTotal","extraFields.freeFloat","extraFields.freeFloatRate","extraFields.rtd19","extraFields.averageMatchVolume2Week","extraFields.averageMatchVolume1Month","extraFields.averageMatchVolume3Month","extraFields.averageMatchVolume1Year","performance.percentPriceChange1Week","performance.percentPriceChange1Month","performance.percentPriceChange3Month","performance.percentPriceChange1Year","organCode","priceInfo.tradingDate","bidAsk.best1BidVolume","bidAsk.best1OfferVolume","priceInfo.matchPrice"]},"MarketInDepth":{"currentTab":4,"liquidity.comGroupCode":"HNXIndex","prospect.currentTab":4},"TopVolume":{"typeTab":1,"indexTab":4},"TopBreakout":{"indexTab":2,"typeTab":5,"rate":"Two","dropdownTimeRange":"TwoWeeks"},"TopValue":{"indexTab":6,"typeTab":1},"Charting":{},"TASignals":{"Indicator.indicatorSearch":{"0":{"organCode":"BID","isinCode":"VN000000BID9","ticker":"BID","comGroupCode":"VNINDEX","icbCode":"8355","organTypeCode":"DN","comTypeCode":"NH","countryLocationCode":"VN","organName":"Ngân hàng Thương mại Cổ phần Đầu tư và Phát triển Việt Nam","organShortName":"BIDV","organFriendlyName":null,"status":1,"createDate":"2015-06-08T00:00:00","updateDate":"2019-04-26T10:35:39.19","displayCode":"BID","code":"BID","codeName":"BIDV","exchange":"HOSE","isTicker":true,"isBanking":true,"isInsurance":false},"1":{"organCode":"BVH","isinCode":"VN000000BVH3","ticker":"BVH","comGroupCode":"VNINDEX","icbCode":"8575","organTypeCode":"DN","comTypeCode":"BH","countryLocationCode":"VN","organName":"Tập đoàn Bảo Việt","organShortName":"Tập đoàn Bảo Việt","organFriendlyName":null,"status":1,"createDate":"2015-06-08T00:00:00","updateDate":"2019-08-05T08:55:59.097","displayCode":"BVH","code":"BVH","codeName":"Tập đoàn Bảo Việt","exchange":"HOSE","isTicker":true,"isBanking":false,"isInsurance":true},"2":{"organCode":"CTD","isinCode":"VN000000CTD4","ticker":"CTD","comGroupCode":"VNINDEX","icbCode":"2357","organTypeCode":"OTHER","comTypeCode":"CT","countryLocationCode":"VN","organName":"Công ty Cổ phần Xây dựng Coteccons","organShortName":"Xây dựng Coteccons","organFriendlyName":null,"status":1,"createDate":"2015-06-08T00:00:00","updateDate":"2019-09-25T09:25:12.407","displayCode":"CTD","code":"CTD","codeName":"Xây dựng Coteccons","exchange":"HOSE","isTicker":true,"isBanking":false,"isInsurance":false},"3":{"organCode":"CTG","isinCode":"VN000000CTG7","ticker":"CTG","comGroupCode":"VNINDEX","icbCode":"8355","organTypeCode":"OTHER","comTypeCode":"NH","countryLocationCode":"VN","organName":"Ngân hàng Thương mại Cổ phần Công thương Việt Nam","organShortName":"VietinBank","organFriendlyName":null,"status":1,"createDate":"2015-06-08T00:00:00","updateDate":"2019-05-04T11:13:55.653","displayCode":"CTG","code":"CTG","codeName":"VietinBank","exchange":"HOSE","isTicker":true,"isBanking":true,"isInsurance":false},"4":{"organCode":"DPM","isinCode":"VN000000DPM1","ticker":"DPM","comGroupCode":"VNINDEX","icbCode":"1357","organTypeCode":"OTHER","comTypeCode":"CT","countryLocationCode":"VN","organName":"Tổng Công ty Cổ phần Phân bón và Hóa chất Dầu khí","organShortName":"Đạm Phú Mỹ","organFriendlyName":null,"status":1,"createDate":"2015-06-08T00:00:00","updateDate":"2019-03-27T10:19:59.753","displayCode":"DPM","code":"DPM","codeName":"Đạm Phú Mỹ","exchange":"HOSE","isTicker":true,"isBanking":false,"isInsurance":false},"5":{"organCode":"EIB","isinCode":"VN000000EIB7","ticker":"EIB","comGroupCode":"VNINDEX","icbCode":"8355","organTypeCode":"OTHER","comTypeCode":"NH","countryLocationCode":"VN","organName":"Ngân hàng Thương mại Cổ phần Xuất nhập khẩu Việt Nam","organShortName":"Eximbank","organFriendlyName":null,"status":1,"createDate":"2015-06-08T00:00:00","updateDate":"2019-05-04T11:13:55.733","displayCode":"EIB","code":"EIB","codeName":"Eximbank","exchange":"HOSE","isTicker":true,"isBanking":true,"isInsurance":false}},"currentTab":3,"Deceptive.currentTabData":6},"News":{"currentTab":1},"TopNewLow":{"timeRange":"SixMonths"},"MarketCalendar":{"currentTab":1},"HeatMap":{"criteria":4,"exchange":2},"PriceDepth":{},"FinancialAnalysis":{},"STRanking":{"currentTab":2}}}"
    },
    response: {
      errors: null
      result: 20698
      status: "Success"
    }
  }
  GetTimeOffset = {
    url: "https://core.fiintrade.vn/Master/GetTimeOffset?language=vi&clientTime=2019-10-10T02:30:12.086Z",
    response: 25.536128899999998
  }
  GetListOrganization = {
    url: "https://core.fiintrade.vn/Master/GetListOrganization?language=vi",
    response: {
      errors: null
      items: [
        {
          comGroupCode: "VNINDEX"
          comTypeCode: "CT"
          countryLocationCode: "VN"
          createDate: "2015-06-08T00:00:00"
          icbCode: "1353"
          isinCode: "VN000000AAA4"
          organCode: "AAA"
          organFriendlyName: null
          organName: "Công ty Cổ phần Nhựa An Phát Xanh"
          organShortName: "An Phát Bioplastics"
          organTypeCode: "OTHER"
          status: 1
          ticker: "AAA"
          updateDate: "2019-09-04T11:21:12.923"
        }
      ]
      packageId: null
      page: 1
      pageSize: 0
      status: "Success"
      totalCount: 1616
    }
  }
  GetAllIcbInductry = {
    url: "https://core.fiintrade.vn/Master/GetAllIcbIndustry?language=vi",
    response: {
      errors: null
      items: [
        {
          createDate: "2014-12-03T13:51:08.173"
          friendlyName: "141"
          icbCode: "0001"
          icbCodePath: "0001"
          icbLevel: 1
          icbName: "Dầu khí "
          icbNamePath: "Dầu khí "
          icbOrder: 0
          icbShortName: "OIL_GAS"
          industryID: 141
          parentIcbCode: "0"
          parentIndustryID: 0
          sectorProfile: null
          status: 1
          updateDate: "2014-12-03T13:51:08.173"
        }
      ]
      packageId: null
      page: 1
      pageSize: 0
      status: "Success"
      totalCount: 176
    }
  }
  GetLatestIndices = {
    url: "https://market.fiintrade.vn/MarketInDepth/GetLatestIndices?language=vi&pageSize=99999&status=1",
    response: {
      errors: null
      items: [
        {
          ceiling: 0
          closeIndex: 989.61
          comGroupCode: "VNINDEX"
          floor: 0
          foreignBuyValueDeal: 0
          foreignBuyValueMatched: 12143626900
          foreignBuyValueTotal: 0
          foreignBuyVolumeDeal: 0
          foreignBuyVolumeMatched: 372300
          foreignBuyVolumeTotal: 0
          foreignCurrentRoom: 0
          foreignSellValueDeal: 0
          foreignSellValueMatched: 11101246200
          foreignSellValueTotal: 0
          foreignSellVolumeDeal: 0
          foreignSellVolumeMatched: 249620
          foreignSellVolumeTotal: 0
          foreignTotalRoom: 0
          highestIndex: 990.51
          indexChange: 1.78
          indexId: 0
          indexValue: 989.61
          lowestIndex: 987.83
          marketStatus: null
          matchValue: 9803000000
          matchVolume: 608230
          openIndex: 988.81
          percentIndexChange: 0.001801929481793426
          referenceIndex: 987.83
          status: 0
          totalDealValue: 25966000000
          totalDealVolume: 410000
          totalDownVolume: 0
          totalMatchValue: 178933000000
          totalMatchVolume: 9049501
          totalNoChangeVolume: 0
          totalStockDownPrice: 209
          totalStockNoChangePrice: 74
          totalStockOverCeiling: 3
          totalStockUnderFloor: 146
          totalStockUpPrice: 119
          totalTrade: 6530
          totalUpVolume: 0
          totalValue: 178933000000
          totalVolume: 9049501
          tradingDate: "2019-10-10T09:29:25"
          typeIndex: 0
        }
      ]
      packageId: null
      page: 0
      pageSize: 0
      status: "Success"
      totalCount: 0
    }
  }
  GetTwoDaysSeries = {
    url: "https://market.fiintrade.vn/WatchList/GetTwoDaysSeries?language=vi&OrganCode=GMD",
    response: {
      errors: null
      items: [
        {
          previousDate: [
            {
              ceilingPrice: 28450
              closePrice: 26900
              floorPrice: 24750
              foreignBuyValueDeal: 0
              foreignBuyValueMatched: 134500000
              foreignBuyVolumeDeal: 0
              foreignBuyVolumeMatched: 5000
              foreignSellValueDeal: 0
              foreignSellValueMatched: 0
              foreignSellVolumeDeal: 0
              foreignSellVolumeMatched: 0
              highestPrice: 26900
              lowestPrice: 26900
              matchPrice: 26900
              matchValue: 148000000
              matchVolume: 5500
              openPrice: 26900
              organCode: "GMD"
              percentPriceChange: 0.011278195488721804
              priceChange: 300
              referencePrice: 26600
              ticker: "GMD"
              totalMatchValue: 148000000
              totalMatchVolume: 5500
              tradingDate: "2019-10-09T09:16:18"
            }
          ]
          toDate: [
            {
              ceilingPrice: 28200
              closePrice: 26400
              floorPrice: 24600
              foreignBuyValueDeal: 0
              foreignBuyValueMatched: 0
              foreignBuyVolumeDeal: 0
              foreignBuyVolumeMatched: 0
              foreignSellValueDeal: 0
              foreignSellValueMatched: 0
              foreignSellVolumeDeal: 0
              foreignSellVolumeMatched: 0
              highestPrice: 26400
              lowestPrice: 26400
              matchPrice: 26400
              matchValue: 92000000
              matchVolume: 3500
              openPrice: 26400
              organCode: "GMD"
              percentPriceChange: 0
              priceChange: 0
              referencePrice: 26400
              ticker: "GMD"
              totalMatchValue: 92000000
              totalMatchVolume: 3500
              tradingDate: "2019-10-10T09:15:58"
            }
          ]
        }
      ]
      packageId: null
      page: 0
      pageSize: 0
      status: "Success"
      totalCount: 0
    }
  }
}
//Danh mục
Danh mục = {
  url: "https://market.fiintrade.vn/WatchList/GetWatchListSummary?language=vi&id=1&WatchListId=35&WatchListType=CompanyGroup",
    response: {
      errors: null
      items: [
        {
          bidAsk: {
            best1Bid: 41300
            best1BidVolume: 460
            best1Offer: 41400
            best1OfferVolume: 700
            best2Bid: 41250
            best2BidVolume: 5490
            best2Offer: 41450
            best2OfferVolume: 50
            best3Bid: 41200
            best3BidVolume: 6000
            best3Offer: 41500
            best3OfferVolume: 20880
            comGroupCode: "VNINDEX"
            organCode: "BID"
            tradingDate: "2019-10-10T09:29:55"
          }
          extraFields: {
            averageMatchVolume1Month: 1260407
            averageMatchVolume1Year: 1408811
            averageMatchVolume2Week: 1125871
            averageMatchVolume3Month: 1391225
            comGroupCode: "VNINDEX"
            foreignerPercentage: 0.0333
            foreignerRoom: 911814713
            foreignerVolume: 113799887
            freeFloat: 170935767
            freeFloatRate: 0.05
            highestPrice1Year: 41800
            lowestPrice1Year: 27600
            organCode: "BID"
            organShortName: "BIDV"
            rtd19: 1.2403972713
          }
          fundamental: {
            cfa18: null
            fryq30: 9602336500000
            isa3: 94335275000000
            isa5: 0
            isa20: 7306410000000
            organCode: "BID"
            rtd7: 15927.7587280977
            rtd11: 141022007527500
            rtd14: 2091.2990327097
            rtd21: 19.7245823552
            rtd25: 2.5898182352
            rtd39: 13.704172651
            rtd51: 0
            rtd53: 2410.262099933
            rtd54: 17.1143213019
            rtq12: 0.128477175
          }
          movingAveragePrice: {
            organCode: "BID", daily: 40900, weekly: 33170, monthly: 33460, quarterly: 34960
          }
          organCode: "BID"
          performance: {
            organCode: "BID"
            percentPriceChange1Day: 0.003649635
            percentPriceChange1Month: 0.0826771654
            percentPriceChange1Week: 0.026119403
            percentPriceChange1Year: 0.1426592798
            percentPriceChange2Month: 0.1887608069
            percentPriceChange2Week: 0.0338345865
            percentPriceChange3Month: 0.2653374233
            percentPriceChange6Month: 0.1538461538
            percentPriceChange9Month: 0.25
            percentPriceChange52Week: 0.1669024045
            percentPriceChangeYTD: 0.199127907
          }
          priceInfo: {
            averagePrice: 0
            best1Bid: 41300
            best1BidVolume: 460
            best1Offer: 41400
            best1OfferVolume: 700
            ceilingPrice: 44100
            closePrice: 41300
            comGroupCode: "VNINDEX"
            dealPrice: 0
            dealValue: 0
            dealVolume: 0
            floorPrice: 38400
            foreignBuyValueDeal: 0
            foreignBuyValueMatched: 208978000
            foreignBuyValueTotal: 208978000
            foreignBuyVolumeDeal: 0
            foreignBuyVolumeMatched: 5060
            foreignBuyVolumeTotal: 5060
            foreignCurrentRoom: 911671313
            foreignSellValueDeal: 0
            foreignSellValueMatched: 0
            foreignSellValueTotal: 0
            foreignSellVolumeDeal: 0
            foreignSellVolumeMatched: 0
            foreignSellVolumeTotal: 0
            foreignTotalRoom: 1025614600
            highestPrice: 41400
            lowestPrice: 41000
            marketStatus: null
            matchPrice: 41300
            matchType: 0
            matchValue: 26000000
            matchVolume: 630
            openPrice: 41250
            organCode: "BID"
            percentPriceChange: 0.0012121212121212121
            priceChange: 50
            referenceDate: "0001-01-01T00:00:00"
            referencePrice: 41250
            ticker: "BID"
            totalBuyTradeVolume: 0
            totalDealValue: 0
            totalDealVolume: 0
            totalMatchValue: 1426000000
            totalMatchVolume: 34630
            totalSellTradeVolume: 0
            totalValue: 1426000000
            totalVolume: 34630
            tradingDate: "2019-10-10T09:29:55"
          }
          rank: 3
          ticker: "BID"
          totalRank: 18
        }
      ]
      packageId: null
      page: 0
      pageSize: 0
      status: "Success"
      totalCount: 30
    }
}
Tạo danh mục = {
  url: "https://core.fiintrade.vn/UserSetting/NewWatchList",
  data: {
    organCodes: []
    text: "abc"
  }
  response: {
    errors: null
    result: 10713
    status: "Success"
  }
}
Cập nhật danh mục = {
  url: "https://core.fiintrade.vn/UserSetting/UpdateWatchList",
  data: {
    organCodes: ["ASECO32", "AAM", "ABR"]
    watchListId: 10713
  },
  response: {
    errors: null
    status: "Success"
  }
}
Lấy thông tin tóm tắt = {
  url: "https://market.fiintrade.vn/WatchList/GetTickerSummary?language=vi&OrganCode=ABR",
  response: {
    errors: null
    items: [
      {
        bidAsk: {
          best1Bid: 0
          best1BidVolume: 0
          best1Offer: 0
          best1OfferVolume: 0
          best2Bid: 0
          best2BidVolume: 0
          best2Offer: 0
          best2OfferVolume: 0
          best3Bid: 0
          best3BidVolume: 0
          best3Offer: 0
          best3OfferVolume: 0
          comGroupCode: ""
          organCode: "ABR"
          tradingDate: "0001-01-01T00:00:00"
        }
        extraFields: {
          averageMatchVolume1Month: 1055
          averageMatchVolume1Year: 2800
          averageMatchVolume2Week: 1230
          averageMatchVolume3Month: 3923
          comGroupCode: "UpcomIndex"
          foreignerPercentage: 0.0848666667
          foreignerRoom: 1215400
          foreignerVolume: 254600
          freeFloat: 900000
          freeFloatRate: 0.3
          highestPrice1Year: 26400
          lowestPrice1Year: 3000
          organCode: "ABR"
          organShortName: "Đầu tư Nhãn Hiệu Việt"
        }
        fundamental: {
          cfa18: null
          fryq30: null
          isa3: null
          isa5: null
          isa20: null
          organCode: "ABR"
          rtd7: 11104.4598963333
          rtd11: 66000000000
          rtd14: 575.5462
          rtd21: 38.2245595575
          rtd25: 1.9811859564
          rtd39: 28.6105187516
          rtd51: 0
          rtd53: 640
          rtd54: 34.375
          rtq12: 0.0513793232
        }
        movingAveragePrice: {organCode: "ABR", daily: 22000, weekly: 4990, monthly: 5050, quarterly: 5641}
        organCode: "ABR"
        performance: {
          organCode: "ABR"
          percentPriceChange1Day: -0.0045454545
          percentPriceChange1Month: 0.164021164
          percentPriceChange1Week: 0
          percentPriceChange1Year: 3
          percentPriceChange2Month: 0.1
          percentPriceChange2Week: 0.116751269
          percentPriceChange3Month: 1.4444444444
          percentPriceChange6Month: 4
          percentPriceChange9Month: 2.7288135593
          percentPriceChange52Week: 3
          percentPriceChangeYTD: 4.3658536585
        }
        priceInfo: {
          averagePrice: 0
          best1Bid: 0
          best1BidVolume: 0
          best1Offer: 0
          best1OfferVolume: 0
          ceilingPrice: 25300
          closePrice: 0
          comGroupCode: "UpcomIndex"
          dealPrice: 0
          dealValue: 0
          dealVolume: 0
          floorPrice: 18700
          foreignBuyValueDeal: 0
          foreignBuyValueMatched: 0
          foreignBuyValueTotal: 0
          foreignBuyVolumeDeal: 0
          foreignBuyVolumeMatched: 0
          foreignBuyVolumeTotal: 0
          foreignCurrentRoom: 1215400
          foreignSellValueDeal: 0
          foreignSellValueMatched: 0
          foreignSellValueTotal: 0
          foreignSellVolumeDeal: 0
          foreignSellVolumeMatched: 0
          foreignSellVolumeTotal: 0
          foreignTotalRoom: 0
          highestPrice: 25000
          lowestPrice: 25000
          marketStatus: null
          matchPrice: 25000
          matchType: 0
          matchValue: 0
          matchVolume: 0
          openPrice: 25000
          organCode: "ABR"
          percentPriceChange: 0.136
          priceChange: 3000
          referenceDate: "2019-10-10T08:45:02.9554374+07:00"
          referencePrice: 22000
          ticker: "ABR"
          totalBuyTradeVolume: 300
          totalDealValue: 0
          totalDealVolume: 0
          totalMatchValue: 7500000
          totalMatchVolume: 300
          totalSellTradeVolume: 2500
          totalValue: 7500000
          totalVolume: 300
          tradingDate: "2019-10-10T11:18:17"
        }
        rank: 24
        ticker: "ABR"
        totalRank: 67
      }
    ]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 1
  }
}
Tin tức = {
  url: "https://market.fiintrade.vn/WatchList/GetWatchListNews?language=vi&Page=1&PageSize=100&WatchListId=34&WatchListType=CompanyGroup",
  response: {
    errors: null
    items: [{newsId: 3836180, organCode: "TNC1", ticker: "BAX", newsTitle: "BAX: Vượt đường ngắn hạn MA20"}]
    packageId: null
    page: 1
    pageSize: 100
    status: "Success"
    totalCount: 0
  }
}
Kỹ thuật = {
  url: "https://market.fiintrade.vn/WatchList/GetTechnical?language=vi&id=1&WatchListId=34&Type=CompanyGroup",
  response: {
    errors: null
    items: [
      {
        daily: {ma5: 9080, rsi: 100, rsiPrev: 100, cmf: -0.13575402703416187, roc: 0, rockPrev: 0.01098901098901099}
        hourly: {ma5: 9120, rsi: 50, rsiPrev: 50, cmf: -0.17421098280397682, roc: -0.01098901098901099, rockPrev: 0}
        matchPrice: 9000
        organCode: "AAV"
        quarterly: {cmf: 0.7741935483870968, ma5: 9040, roc: -0.021739130434782608, rockPrev: -0.021739130434782608, rsi: 0, rsiPrev: 0}
        weekly: {cmf: 1.7338557907498382, ma5: 9300, roc: -0.010869565217391304, rockPrev: 0, rsi: 100, rsiPrev: 100}
      }
    ]
    packageId: "cf037cde-ebc7-4fec-b2f6-29c1374bee74"
    page: 0
    pageSize: 0
    status: "Apart"
    totalCount: 0
  }
}
Thỏa thuận = {
  url: "https://market.fiintrade.vn/WatchList/GetPutThrough?language=vi",
  response: {
    errors: null
    items: [
      {
        hnx: [
          {
            ealPrice: 8500
            dealValue: 5536900000
            dealVolume: 651400
            matchPrice: 9000
            organCode: "ICG"
            percentPriceChange: 0
            priceChange: 0
            referencePrice: 9000
            ticker: "ICG"
            totalDealValue: 5536900000
            totalDealVolume: 651400
            tradingDate: "2019-10-10T09:21:39"
          }
        ],
        hose: [...],
        upcom: [...]
      }
    ]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}

//Thị trường chuyên sâu
Chỉ số gần nhất = {
  url: "https://market.fiintrade.vn/MarketInDepth/GetLatestIndices?language=vi&pageSize=99999&status=1",
  response: {
    errors: null
    items: [
      {
        ceiling: 0
        closeIndex: 989.61
        comGroupCode: "VNINDEX"
        floor: 0
        foreignBuyValueDeal: 0
        foreignBuyValueMatched: 12143626900
        foreignBuyValueTotal: 0
        foreignBuyVolumeDeal: 0
        foreignBuyVolumeMatched: 372300
        foreignBuyVolumeTotal: 0
        foreignCurrentRoom: 0
        foreignSellValueDeal: 0
        foreignSellValueMatched: 11101246200
        foreignSellValueTotal: 0
        foreignSellVolumeDeal: 0
        foreignSellVolumeMatched: 249620
        foreignSellVolumeTotal: 0
        foreignTotalRoom: 0
        highestIndex: 990.51
        indexChange: 1.78
        indexId: 0
        indexValue: 989.61
        lowestIndex: 987.83
        marketStatus: null
        matchValue: 9803000000
        matchVolume: 608230
        openIndex: 988.81
        percentIndexChange: 0.001801929481793426
        referenceIndex: 987.83
        status: 0
        totalDealValue: 25966000000
        totalDealVolume: 410000
        totalDownVolume: 0
        totalMatchValue: 178933000000
        totalMatchVolume: 9049501
        totalNoChangeVolume: 0
        totalStockDownPrice: 209
        totalStockNoChangePrice: 74
        totalStockOverCeiling: 3
        totalStockUnderFloor: 146
        totalStockUpPrice: 119
        totalTrade: 6530
        totalUpVolume: 0
        totalValue: 178933000000
        totalVolume: 9049501
        tradingDate: "2019-10-10T09:29:25"
        typeIndex: 0
      }
    ]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}
Biểu đồ chỉ số = {
  url: "https://market.fiintrade.vn/MarketInDepth/GetIndexSeries?language=vi&ComGroupCode=VN30&TimeRange=OneMonth&id=1",
  response: {
    errors: null
    items: [
      {
        closeIndex: 885.79
        comGroupCode: "VN30"
        highestIndex: 886.83
        indexChange: 0.18
        indexValue: 885.79
        lowestIndex: 885.27
        matchValue: 72260000000
        matchVolume: 2624930
        openIndex: 886.83
        percentIndexChange: 0.0002032497
        referenceIndex: 885.61
        totalMatchValue: 83426000000
        totalMatchVolume: 2952610
        tradingDate: "2019-09-10T09:30:37"
      }
    ]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 223
  }
}
Các thị trường = {
  url: "https://market.fiintrade.vn/MarketInDepth/GetProspect?language=vi&ComGroupCode=VNINDEX",
  response: {
    errors: null
    items: [
      heatMap: {
        comGroupCode: "VNINDEX"
        heatmaps: [
          {
            asianMarket: [
              {
                indexChange: 24.52
                indexValue: 2046.25
                percentIndexChange: 0.0121282368
                tradingDate: "2019-10-08T00:00:00"
                worldIndexCode: "KOSPI"
              }
            ]
            centralBankRate: {
              exchangeRate: 23156
              previousExchangeRate: 23157
              previousPublicDate: "2019-10-08T00:00:00"
              publicDate: "2019-10-09T00:00:00"
            }
            europMarket: [
              {
                indexChange: -127.23
                indexValue: 11970.2
                percentIndexChange: -0.0105170682
                tradingDate: "2019-10-08T00:00:00"
                worldIndexCode: "DAX"
              }
            ]
            foreignFlow: {
              foreignBuyValueMatched: 200625373700
              foreignSellValueMatched: 185036236300
              netForeign: 15589137400
              tradingDate: "2019-10-09T00:00:00"
            }
            oilWtiPrice: {
              percentPriceChange: -0.0123094363
              price: 52.45
              priceChange: -0.65
              tradingDate: "2019-10-09T00:00:00"
            }
            timeRange: "Daily"
            usMarket: [
              {
                indexChange: -313.98
                indexValue: 26164.04
                percentIndexChange: -0.0118581553
                tradingDate: "2019-10-08T00:00:00"
                worldIndexCode: "DJI"
              }
            ]
            vnIndex: {
              closeIndex: 987.83
              indexChange: -0.39
              indexValue: 987.83
              percentIndexChange: -0.000394649
              tradingDate: "2019-10-09T00:00:00"
            }
            worldGoldPrice: {
              buyPrice: 1506.25
              buyPriceChange: 13.73
              percentBuyPriceChange: 0.0091992067
              tradingDate: "2019-10-09T00:00:00"
            }
          }
        ]
      }
      series: {
        ceiling: 0
        closeIndex: 989.77
        comGroupCode: "VNINDEX"
        floor: 0
        foreignBuyValueDeal: 0
        foreignBuyValueMatched: 73158043600
        foreignBuyValueTotal: 0
        foreignBuyVolumeDeal: 0
        foreignBuyVolumeMatched: 1451578
        foreignBuyVolumeTotal: 0
        foreignCurrentRoom: 0
        foreignSellValueDeal: 0
        foreignSellValueMatched: 86979155300
        foreignSellValueTotal: 0
        foreignSellVolumeDeal: 0
        foreignSellVolumeMatched: 1487698
        foreignSellVolumeTotal: 0
        foreignTotalRoom: 0
        highestIndex: 990.89
        indexChange: 1.94
        indexId: 0
        indexValue: 989.77
        lowestIndex: 987.83
        marketStatus: null
        matchValue: 8757000000
        matchVolume: 488910
        openIndex: 988.81
        percentIndexChange: 0.001963900671168116
        referenceIndex: 987.83
        status: 0
        totalDealValue: 185660362800
        totalDealVolume: 5890548
        totalDownVolume: 0
        totalMatchValue: 782042000000
        totalMatchVolume: 36644442
        totalNoChangeVolume: 0
        totalStockDownPrice: 215
        totalStockNoChangePrice: 64
        totalStockOverCeiling: 4
        totalStockUnderFloor: 104
        totalStockUpPrice: 123
        totalTrade: 19437
        totalUpVolume: 0
        totalValue: 782042000000
        totalVolume: 36644442
        tradingDate: "2019-10-10T10:06:50"
        typeIndex: 0
      }
    ]
    packageId: null
    page: 1
    pageSize: 0
    status: "Success"
    totalCount: 1
  }
}
Định giá = {
  url: "https://market.fiintrade.vn/MarketInDepth/GetValuationSeries?language=vi&Code=VNINDEX&TimeRange=SixMonths",
  response: {
    errors: null
    items: [
      {
        code: "VNINDEX"
        r21: 16.7185017761
        r25: 2.5738910205
        r26: 3.8023544121
        r27: 4.072201386
        tradingDate: "2019-04-10T00:00:00"
        value: 981.91
      }
    ]
    packageId: null
    page: 1
    pageSize: 0
    status: "Success"
    totalCount: 126
  }
}
Thanh khoản = {
  url: "https://market.fiintrade.vn/MarketInDepth/GetLiquiditySeries?language=vi&ComGroupCode=VNINDEX&TimeRange=OneWeek"
  response: {
    errors: null
    items: [
      {
        comGroupCode: "VNINDEX"
        totalMatchValue: 0
        totalMatchVolume: 0
        tradingDate: "2019-10-10T09:00:00"
      }
    ]
    packageId: null
    page: 1
    pageSize: 999999
    status: "Success"
    totalCount: 361
  }
}
Biến động = {
  url: "https://market.fiintrade.vn/MarketInDepth/GetMarketAnomaly?language=vi&Code=VNINDEX&TimeRange=FiveYears",
  response: {
    errors: null
    items: [
      {
        anomalyItems: [
          {
            apr: -0.005317899284174675
            aug: -0.006066882409843956
            code: "VNINDEX"
            dec: 0.002323259291323239
            feb: 0.029436122022566357
            fri: 0.0013055684
            i: 0.08693546751773332
            ii: 0.012852279681469719
            iii: 0.03540312605010939
            iv: 0.018199696275153034
            jan: 0.034709327657799396
            jul: 0.025456614845632924
            jun: 0.018967515667784398
            mar: 0.0019007770294066013
            may: -0.004227273268842034
            mon: -0.0003901187
            nov: 0.018821017223274387
            oct: -0.0007074934569730887
            sep: 0.01619454665592055
            thu: -0.00006804
            tue: 0.0005694764
            wed: 0.0013085501
            year: 0
          }
        ]
        percentValueChange: 0.0024194446412844316
        value: 990.22
        valueChange: 2.39
      }
    ]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}
Giá gần nhất = {
  url: "https://technical.fiintrade.vn/PriceData/GetLatestPrice?language=vi&Code=VNINDEX",
  response: {
    errors: null
    items: [
      {
        bidAskInfo: null
        priceInfo: {
          averagePrice: 0
          best1Bid: 0
          best1BidVolume: 0
          best1Offer: 0
          best1OfferVolume: 0
          ceilingPrice: 0
          closePrice: 990.22
          comGroupCode: null
          dealPrice: 0
          dealValue: 0
          dealVolume: 0
          floorPrice: 0
          foreignBuyValueDeal: 0
          foreignBuyValueMatched: 0
          foreignBuyValueTotal: 0
          foreignBuyVolumeDeal: 0
          foreignBuyVolumeMatched: 0
          foreignBuyVolumeTotal: 0
          foreignCurrentRoom: 0
          foreignSellValueDeal: 0
          foreignSellValueMatched: 0
          foreignSellValueTotal: 0
          foreignSellVolumeDeal: 0
          foreignSellVolumeMatched: 0
          foreignSellVolumeTotal: 0
          foreignTotalRoom: 0
          highestPrice: 990.89
          lowestPrice: 987.83
          marketStatus: null
          matchPrice: 990.22
          matchType: 0
          matchValue: 0
          matchVolume: 0
          openPrice: 988.81
          organCode: null
          percentPriceChange: 0.0024194446412844316
          priceChange: 2.39
          referenceDate: "0001-01-01T00:00:00"
          referencePrice: 987.83
          ticker: null
          totalBuyTradeVolume: 0
          totalDealValue: 0
          totalDealVolume: 0
          totalMatchValue: 962868000000
          totalMatchVolume: 45665992
          totalSellTradeVolume: 0
          totalValue: 962868000000
          totalVolume: 45665992
          tradingDate: "2019-10-10T10:13:56"
        }
      }
    ]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}

//Danh sách TOP
Biểu đồ nến = {
  url: "https://market.fiintrade.vn/Chart/Get6MonthsCandleStickChartImage?language=vi&organCode=CEO&theme=Dark",
  response: {
    errors: null
    items: [
      "data:image/png;base64..."
    ]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}
Top khối lượng = {
  url: "https://market.fiintrade.vn/TopMover/GetTopVolume?language=vi&ComGroupCode=All",
  response: {
    errors: null
    items: [
      {
        ceilingPrice: 8560
        financial: {
          cfa18: null
          fryq30: 1166063557131.77
          isa3: 13379753414242
          isa5: 1334257615922
          isa20: 654026630268
          organCode: "ASM"
          rtd7: 15277.9420255816
          rtd11: 2070942792000
          rtd14: 1748.7327008075
          rtd21: 4.5747414664
          rtd25: 0.5236307342
          rtd39: 488.0222522256
          rtd51: 0
          rtd53: 4805.5407606836
          rtd54: 1.6647450096
          rtq12: 0.0764306429
        }
        floorPrice: 7440
        h: 8410
        l: 8000
        o: 8000
        organCode: "ASM"
        percentPriceChange: 0.03125
        performance: {
          organCode: "ASM"
          percentPriceChange1Day: 0.0012515645
          percentPriceChange1Month: 0.3245033113
          percentPriceChange1Week: 0.0638297872
          percentPriceChange1Year: -0.2925775468
          percentPriceChange2Month: 0.2861736334
          percentPriceChange2Week: 0.1065006916
          percentPriceChange3Month: 0.1444921316
          percentPriceChange6Month: 0.038961039
          percentPriceChange9Month: 0.0337936817
          percentPriceChange52Week: -0.2776530224
          percentPriceChangeYTD: 0.0974117544
        }
        price: 8250
        priceChange: 250
        rank: 6
        referencePrice: 8000
        sectorName: "Sản xuất thực phẩm"
        technical: {
          c1: 8000
          c2: 7990
          cmf: 0.2777983108
          h1: 8000
          h2: 8110
          l1: 7930
          l2: 7900
          o1: 7990
          o2: 8000
          organCode: "ASM"
          roc: 33.6120401338
          rsi: 78.1659388646
          sma20: 7215
          sma20Past4: 6848
          sma50: 6630.2
          sma100: 6864.1
        }
        ticker: "ASM"
        totalRank: 102
        value: 33452000000
        volume: 4070270
      }
    ]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}
Download top khối lượng = {
  url: "https://market.fiintrade.vn/Download/DownloadTopVolume?language=vi&ComGroupCode=UpcomIndex&Screen=Overview",
  response: file
}
//Top đột phá
Top đột phá = {
  url: "https://market.fiintrade.vn/TopMover/GetTopBreakout?language=vi&ComGroupCode=All&TimeRange=OneWeek&Rate=OnePointFive",
  response: {
    errors: null
    items: [
      {
        averageMatchVolume: 1175896
        ceilingPrice: 25400
        financial: {...}
        floorPrice: 22100
        h: 24100
        l: 23700
        o: 23750
        organCode: "HHSF"
        percentPriceChange: 0.01263157894736842
        performance: {...}
        price: 24050
        priceChange: 300
        rank: 2
        referencePrice: 23750
        sectorName: "Sản xuất ô tô"
        technical: {...}
        ticker: "TCH"
        totalRank: 15
        value: 47239000000
        volume: 1972330
      }
    ]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}
Download top đột phá = {
  url: "https://market.fiintrade.vn/Download/DownloadTopVolume?language=vi&ComGroupCode=UpcomIndex&Screen=Overview",
  response: file
}
//Top giá trị
Top giá trị  = {
  url: "https://market.fiintrade.vn/TopMover/GetTopValue?language=vi&ComGroupCode=All",
  response: {
    errors: null
    items: [
      ceilingPrice: 23600
      financial: {...}
      floorPrice: 20600
      h: 22300
      l: 22100
      o: 22100
      organCode: "VPB"
      percentPriceChange: 0.004524886877828055
      performance: {...}
      price: 22200
      priceChange: 100
      rank: 7
      referencePrice: 22100
      sectorName: "Ngân hàng"
      technical: {...}
      ticker: "VPB"
      totalRank: 18
      value: 59165000000
      volume: 2665610
    ]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}
Download top giá trị = {
  url: "https://market.fiintrade.vn/Download/DownloadTopValue?language=vi&ComGroupCode=HNX30&Screen=Overview",
  response: file
}
//Top tăng giá
Top tăng giá = {
  url: "https://market.fiintrade.vn/TopMover/GetTopGainers?language=vi&ComGroupCode=All",
  response: {
    errors: null
    items: [
      {
        ceilingPrice: 10400
        financial: {...}
        floorPrice: 8600
        h: 10300
        l: 8800
        o: 8800
        organCode: "PGN"
        percentPriceChange: 0.08421052631578947
        performance: {...}
        price: 10300
        priceChange: 800
        rank: 63
        referencePrice: 9500
        sectorName: "Nhựa, cao su & sợi"
        technical: {...}
        ticker: "PGN"
        totalRank: 68
        value: 441030000
        volume: 50100
      }
    ]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}
Download top tăng giá = {
  url: "https://market.fiintrade.vn/Download/DownloadTopGainer?language=vi&ComGroupCode=All&Screen=Overview",
  response: file
}
//Top giảm giá
Top giảm giá = {
  url: "https://market.fiintrade.vn/TopMover/GetTopLosers?language=vi&ComGroupCode=All",
  response: {
    errors: null
    items: [
      {
        ceilingPrice: 1300
        financial: {...}
        floorPrice: 1100
        h: 1300
        l: 1100
        o: 1200
        organCode: "KLF"
        percentPriceChange: -0.08333333333333333
        performance: {...}
        price: 1100
        priceChange: -100
        rank: 16
        referencePrice: 1200
        sectorName: "Dịch vụ giải trí"
        technical: {...}
        ticker: "KLF"
        totalRank: 58
        value: 345693600
        volume: 287678
      }
    ]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}
Download top giảm giá = {
  url: "https://market.fiintrade.vn/Download/DownloadTopLoser?language=vi&ComGroupCode=All&Screen=Overview",
  response: file
}
//Top vượt đỉnh
Top vượt đỉnh = {
  url: "https://market.fiintrade.vn/TopMover/GetTopNewHigh?language=vi&ComGroupCode=All&TimeRange=ThreeMonths"
  response: {
    errors: null
    items: [
      {
        ceilingPrice: 8560
        financial: {...}
        floorPrice: 7440
        h: 8410
        l: 8000
        o: 8000
        oldHigh: 8110
        organCode: "ASM"
        percentPriceChange: 0.03125
        performance: {...}
        price: 8250
        priceChange: 250
        rank: 6
        referencePrice: 8000
        sectorName: "Nuôi trồng nông & hải sản"
        technical: {...}
        ticker: "ASM"
        totalRank: 102
        value: 34030000000
        volume: 4140270
      }
    ]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}
Download top vượt đỉnh = {
  url: "https://market.fiintrade.vn/Download/DownloadTopNewHigh?language=vi&ComGroupCode=All&Screen=Overview&TimeRange=ThreeMonths",
  response: file
}
//Top thủng đáy
Top thủng đáy = {
  url: "https://market.fiintrade.vn/TopMover/GetTopNewLow?language=vi&ComGroupCode=All&TimeRange=ThreeMonths",
  response: {
    errors: null
    items: [
      {
        ceilingPrice: 61800
        financial: {...}
        floorPrice: 53800
        h: 58200
        l: 57500
        o: 57700
        oldLow: 57700
        organCode: "PETRO"
        percentPriceChange: -0.005190311418685121
        performance: {...}
        price: 57500
        priceChange: -300
        rank: 1
        referencePrice: 57800
        sectorName: "Sản xuất và Khai thác dầu khí"
        technical: {...}
        ticker: "PLX"
        totalRank: 3
        value: 7436000000
        volume: 128950
      }
    ]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}
Download top thủng đáy = {
  url: "https://market.fiintrade.vn/Download/DownloadTopNewLow?language=vi&ComGroupCode=All&TimeRange=ThreeMonths&Screen=Overview",
  response: file
}
//Top nhà đầu tư nước ngoài
Top nhà đầu tư nước ngoài = {
  url: "https://market.fiintrade.vn/TopMover/GetTopForeignTrading?language=vi&ComGroupCode=All&Option=NetBuyVol",
  response: {
    errors: null
    items: [
      {
        ceilingPrice: 16350
        financial: {...}
        floorPrice: 14250
        foreignBuyValueMatched: 5978588000
        foreignBuyVolumeMatched: 388220
        foreignSellValueMatched: 0
        foreignSellVolumeMatched: 0
        h: 15400
        l: 15250
        o: 15300
        organCode: "KBC"
        percentPriceChange: 0.006535947712418301
        performance: {...}
        price: 15400
        priceChange: 100
        rank: 10
        referencePrice: 15300
        sectorName: "Bất động sản"
        technical: {...}
        ticker: "KBC"
        totalRank: 120
        value: 9630000000
        volume: 628630
      }
    ]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}
Download top NDTNN = {
  url: "https://market.fiintrade.vn/Download/DownloadTopForeignTrading?language=vi&ComGroupCode=All&Option=NetBuyVol&Screen=Overview",
  response: file
}

//Lịch sự kiện
Lịch sự kiện = {
  url: "https://market.fiintrade.vn/Calendar/GetEconomy?language=vi&WeekOfYear=41&Year=2019&Page=1&PageSize=50&KeyWord=",
  response: {
    errors: null
    items: [
      {
        eventTitle: "Công bố sơ bộ_Nhập khẩu hàng hóa của doanh nghiệp có vốn đầu tư trực tiếp nước ngoài (FDI) tháng 09/2019"
        forecastValue: 0
        issueDateFrom: "2019-10-10T00:00:00"
        levelName: "Nomal"
        newsId: 0
        newsSourceLink: null
        previousValue: 0
        recentValue: 0
        sourceUrl: null
        unitCode: null
      }
    ]
    packageId: null
    page: 1
    pageSize: 0
    status: "Success"
    totalCount: 9
  }
}
Danh mục sự kiện = {
  url: "https://market.fiintrade.vn/Calendar/GetCalendarWatchList?language=vi&Page=1&PageSize=50&WatchlistType=CompanyGroup&WatchListId=35",
  response: {
    errors: null
    items: [
      {
        eventId: 1
        eventListCode: "LIS"
        eventTitle: "MWG - Niêm yết bổ sung 50.000 cổ phiếu"
        exerciseDate: "2019-10-11T00:00:00"
        exrightDate: null
        organCode: "MWG"
        publicDate: "2019-10-04T16:49:01.183"
        recordDate: null
        sourceUrl: "http://fiinpro.com/News/Detail/3815144?lang=vi-VN"
        ticker: "MWG"
      }
    ]
    packageId: null
    page: 1
    pageSize: 50
    status: "Success"
    totalCount: 3947
  }
}
Toàn thị trường - lợi nhuận = {
  url: "https://market.fiintrade.vn/Calendar/GetCorporateEarning?language=vi&OrganCode=&Page=1&PageSize=50&FromDate=2019-10-07T00:00:00+%2B07:00&ToDate=2019-10-13T00:00:00+%2B07:00",
  response: {
    errors: null
    items: [
      {
        lengthReport: 3
        organCode: "BRC"
        organShortName: "Cao su Bến Thành"
        profit: 4796233334
        profitForeCast: 20848235988.4785
        publicDate: "2019-10-09T00:00:00"
        revenue: 77399674671
        revenueForeCast: 260506788137.646
        ticker: "BRC"
        yearReport: 2019
      }
    ]
    packageId: null
    page: 1
    pageSize: 50
    status: "Success"
    totalCount: 4
  }
}
Toàn thị trường - cổ tức tiền mặt = {
  url: "https://market.fiintrade.vn/Calendar/GetCorporateCashDividend?language=vi&OrganCode=&Page=1&PageSize=50&FromDate=2019-10-01T00:00:00+%2B07:00&ToDate=2019-10-31T00:00:00+%2B07:00",
  response: {
    errors: null
    items: [
      {
        dividendYear: 2018
        exerciseRate: 0.1
        exrightDate: "2019-08-14T00:00:00"
        organCode: "C471"
        payoutDate: "2019-10-31T00:00:00"
        publicDate: "2019-08-08T00:00:00"
        recordDate: "2019-08-15T00:00:00"
        stageName: "Cả năm"
        ticker: "C71"
        valuePerShare: 1000
      }
    ]
    packageId: null
    page: 1
    pageSize: 50
    status: "Success"
    totalCount: 96
  }
}
Toàn thị trường - cổ tức cổ phiếu = {
  url: "https://market.fiintrade.vn/Calendar/GetCorporateStockDividend?language=vi&OrganCode=&Page=1&PageSize=50&FromDate=2019-10-01T00:00:00+%2B07:00&ToDate=2019-10-31T00:00:00+%2B07:00",
  response: {
    errors: null
    items: [{
      dividendYear: 2018
      exerciseRate: 0.1
      exrightDate: "2019-10-11T00:00:00"
      organCode: "SHA"
      payoutDate: "2019-10-11T00:00:00"
      publicDate: "2019-10-04T14:13:37.25"
      recordDate: "2019-10-14T00:00:00"
      stageName: "Cả năm"
      ticker: "SHA"
      valuePerShare: 0
    }]
    packageId: null
    page: 1
    pageSize: 50
    status: "Success"
    totalCount: 5
  }
}
Toàn thị trường - phát hành cổ phiếu = {
  url: "https://market.fiintrade.vn/Calendar/GetCorporateShareIssuance?language=vi&OrganCode=&Page=1&PageSize=50&FromDate=2019-10-01T00:00:00+%2B07:00&ToDate=2019-10-31T00:00:00+%2B07:00",
  response: {
    errors: null
    items: [
      {
        exerciseRatio: 0.25327
        exrightDate: "2019-10-11T00:00:00"
        issueDate: "2019-10-11T00:00:00"
        issueMethodName: "Cổ phiếu thưởng"
        issueStatusName: "Thông báo"
        issueYear: 2019
        listingDate: null
        organCode: "DUGRACO"
        planVolumn: 1818772
        publicDate: "2019-10-08T14:52:13.66"
        ticker: "MGG"
      }
    ]
    packageId: null
    page: 1
    pageSize: 50
    status: "Success"
    totalCount: 7
  }
}
Toàn thị trường - niêm yết = {
  url: "https://market.fiintrade.vn/Calendar/GetCorporateListing?language=vi&OrganCode=&Page=1&PageSize=50&FromDate=2019-10-01T00:00:00+%2B07:00&ToDate=2019-10-31T00:00:00+%2B07:00",
  response: {
    errors: null
    items: [
      {
        eventName: "Niêm yết thêm"
        exrightDate: null
        issueDate: "2019-10-21T00:00:00"
        organCode: "GMD"
        organShortName: "Gemadept"
        publicDate: "2015-11-18T14:48:39.643"
        recordDate: null
        ticker: "GMD"
      }
    ]
    packageId: null
    page: 1
    pageSize: 50
    status: "Success"
    totalCount: 32
  }
}
Toàn thị trường - đại hội cổ đông thường niên = {
  url: "https://market.fiintrade.vn/Calendar/GetCorporateAGM?language=vi&OrganCode=&Page=1&PageSize=50&FromDate=2019-10-01T00:00:00+%2B07:00&ToDate=2019-10-31T00:00:00+%2B07:00",
  response: {
    errors: null
    items: [
      {
        address: "Lô A3 Khu công nghiệp Nguyễn Đức Cảnh, Đường Trần Thái Tông, Phường Tiền Phong"
        eventTitle: null
        exrightDate: "2019-10-14T00:00:00"
        locationName: null
        organCode: "FORTEX"
        organShortName: "Phát triển Đức Quân"
        publicDate: "2019-10-07T11:51:06.717"
        sourceUrl: ""
        ticker: "FTM"
      }
    ]
    packageId: null
    page: 1
    pageSize: 50
    status: "Success"
    totalCount: 3
  }
}

Bản đồ nhiệt = {
  url: "https://market.fiintrade.vn/HeatMap/GetHeatMap?language=vi&Exchange=All&Criteria=MarketCap",
  response: {
    errors: null
    items: [
      {
        sectors: [
          {
            icbCode: "0001"
            name: "Dầu khí "
            rate: -0.0005715477851217415
            tickers: [
              {
                ceilingPrice: 61800
                floorPrice: 53800
                matchPrice: 57500
                name: "PLX"
                organCode: "PETRO"
                percentPriceChange: -0.005190311418685121
                referencePrice: 57800
                value: 67321761012500
              }
            ]
            value: 125047505602700
          }
        ]
        time: "2019-10-10T11:12:55.9767339+07:00"
      }
    ]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}

Xu hướng dòng tiền = {
  url: "https://market.fiintrade.vn/MoneyFlow/GetContribution?language=vi&ComGroupCode=VNINDEX&time=1570681236377",
  response: {
    errors: null
    items: [
      {
        contrib1Day: {
          topGainers: [
            {
              averageVolume1Week: 1326552
              contribution: 8.7574167088729
              contributionPercent: 0.008843285006283915
              matchPrice: 85100
              organCode: "VCB"
              percentPriceChange: 0.007100591715976331
              priceChange: 600
              rank: 1
              rtd11: 313400144356000
              ticker: "VCB"
              totalMatchValue: 20454000000
              totalMatchVolume: 241470
            }
          ]
          topLosers: [
            {
              averageVolume1Week: 486180
              contribution: -5.28411465869917
              contributionPercent: -0.005335926505063334
              matchPrice: 117400
              organCode: "VIC"
              percentPriceChange: 0.003418803418803419
              priceChange: 400
              rank: 1
              rtd11: 391474440513000
              ticker: "VIC"
              totalMatchValue: 5578000000
              totalMatchVolume: 47550
            }
          ]
        }
        contrib5Day: {topGainers: [...], topLosers: [...]}
        contrib10Day: {topGainers: [...], topLosers: [...]}
        contrib20Day: {topGainers: [...], topLosers: [...]}
        series: {
          ceiling: 0
          closeIndex: 990.29
          comGroupCode: "VNINDEX"
          floor: 0
          foreignBuyValueDeal: 0
          foreignBuyValueMatched: 100603586000
          foreignBuyValueTotal: 0
          foreignBuyVolumeDeal: 0
          foreignBuyVolumeMatched: 2413758
          foreignBuyVolumeTotal: 0
          foreignCurrentRoom: 0
          foreignSellValueDeal: 0
          foreignSellValueMatched: 127342256100
          foreignSellValueTotal: 0
          foreignSellVolumeDeal: 0
          foreignSellVolumeMatched: 2850778
          foreignSellVolumeTotal: 0
          foreignTotalRoom: 0
          highestIndex: 990.89
          indexChange: 2.46
          indexId: 0
          indexValue: 990.29
          lowestIndex: 987.83
          marketStatus: null
          matchValue: 0
          matchVolume: 0
          openIndex: 988.81
          percentIndexChange: 0.0024903070366358586
          referenceIndex: 987.83
          status: 0
          totalDealValue: 362926915700
          totalDealVolume: 13668418
          totalDownVolume: 0
          totalMatchValue: 1326425000000
          totalMatchVolume: 63129951
          totalNoChangeVolume: 0
          totalStockDownPrice: 208
          totalStockNoChangePrice: 76
          totalStockOverCeiling: 4
          totalStockUnderFloor: 81
          totalStockUpPrice: 118
          totalTrade: 30059
          totalUpVolume: 0
          totalValue: 1326425000000
          totalVolume: 63129951
          tradingDate: "2019-10-10T11:19:56"
          typeIndex: 0
        }
      }
    ]
    packageId: null
    page: 1
    pageSize: 0
    status: "Success"
    totalCount: 1
  }
}
//GIÁ
Time & Sales = {
  url: "https://technical.fiintrade.vn/TimeAndSales/GetTimeAndSales?language=vi&Code=AAA",
  response: {
    errors: null
    items: [
      {
        matches: [
          {
            ceilingPrice: 15800
            closePrice: 14950
            floorPrice: 13800
            highestPrice: 15000
            lowestPrice: 14850
            matchPrice: 14950
            matchType: "BU"
            matchValue: 187000000
            matchVolume: 12500
            openPrice: 14850
            organCode: "AAA"
            percentPriceChange: 0.010135135135135136
            priceChange: 150
            referencePrice: 14800
            ticker: "AAA"
            totalMatchValue: 13060000000
            totalMatchVolume: 875130
            totalValue: 13060000000
            totalVolume: 875130
            tradingDate: "2019-10-10T11:19:51"
          }
        ]
        timeAndSales: [
          {
            buyUpVolume: 394170
            naVolume: 530
            price: 14950
            sellDownVolume: 43470
          }
        ]
      }
    ]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}
DownloadTimeAndSales = {
  url: "https://technical.fiintrade.vn/TimeAndSales/DownloadTimeAndSales?language=vi&Code=AAA",
  response: file
}

Chi tiết bước giá = {
  url: "https://technical.fiintrade.vn/PriceDepth/GetPriceDepth?language=vi&Code=AAA",
  response: {
    errors: null
    items: [
      {
        bidAsk: {
          best1Bid: 14900
          best1BidVolume: 24550
          best1Offer: 14950
          best1OfferVolume: 33090
          best2Bid: 14850
          best2BidVolume: 49640
          best2Offer: 15000
          best2OfferVolume: 205550
          best3Bid: 14800
          best3BidVolume: 85330
          best3Offer: 15050
          best3OfferVolume: 133000
          best4Bid: 0
          best4BidVolume: 0
          best4Offer: 0
          best4OfferVolume: 0
          best5Bid: 0
          best5BidVolume: 0
          best5Offer: 0
          best5OfferVolume: 0
          best6Bid: 0
          best6BidVolume: 0
          best6Offer: 0
          best6OfferVolume: 0
          best7Bid: 0
          best7BidVolume: 0
          best7Offer: 0
          best7OfferVolume: 0
          best8Bid: 0
          best8BidVolume: 0
          best8Offer: 0
          best8OfferVolume: 0
          best9Bid: 0
          best9BidVolume: 0
          best9Offer: 0
          best9OfferVolume: 0
          best10Bid: 0
          best10BidVolume: 0
          best10Offer: 0
          best10OfferVolume: 0
          comGroupCode: "VNINDEX"
          organCode: "AAA"
          tradingDate: "2019-10-10T11:25:22"
        }
        extraInfo: {
          averageVolume1Month: 1751047
          averageVolume2Week: 1984188
          foreignerPercentage: 0.0234
          organCode: "AAA"
          rtd11: 2533759644800
          rtd14: 2582.8460466133
          rtd21: 5.7301131128
          rtd25: 0.8744582628
          rtd35: 0.7368816207
          rtq12: 0.143675756
          ticker: "AAA"
        }
        price: {
          averagePrice: 0
          ceilingPrice: 15800
          closePrice: 14950
          comGroupCode: "VNINDEX"
          floorPrice: 13800
          foreignBuyValueTotal: 0
          foreignBuyVolumeTotal: 0
          foreignCurrentRoom: 63697080
          foreignSellValueTotal: 5980000
          foreignSellVolumeTotal: 400
          foreignTotalRoom: 67709590
          highestPrice: 15000
          lowestPrice: 14850
          marketStatus: null
          matchPrice: 14950
          matchValue: 35000000
          matchVolume: 2300
          openPrice: 14850
          organCode: "AAA"
          percentPriceChange: 0.010135135135135136
          priceChange: 150
          referenceDate: "0001-01-01T00:00:00"
          referencePrice: 14800
          ticker: "AAA"
          totalDealValue: 0
          totalDealVolume: 0
          totalMatchValue: 13394000000
          totalMatchVolume: 897530
          totalValue: 13394000000
          totalVolume: 897530
          tradingDate: "2019-10-10T11:25:22"
        }
        rank: 2
        totalRank: 68
      }
    ]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}

Thống kê giá = {
  url: "https://technical.fiintrade.vn/PriceData/GetPriceData?language=vi&Code=VNINDEX&Frequently=Daily&Page=1&PageSize=60",
  response: {
    errors: null
    items: [
      {
        averageValue: 0
        benefit: null
        ceilingValue: 0
        closeValue: 987.83
        code: "VNINDEX"
        delist: null
        floorValue: 0
        foreignBuyValueMatched: 200625373700
        foreignBuyVolumeMatched: 6712840
        foreignCurrentRoom: 20380151924
        foreignSellValueMatched: 185036236300
        foreignSellVolumeMatched: 6060680
        foreignTotalRoom: 37421431010
        foreignerPercentage: null
        haltResumeFlag: null
        highestValue: 992
        iIndex: 0
        iNav: 0
        issueDate: "0001-01-01T00:00:00"
        lowestValue: 986.74
        matchValue: 987.83
        meeting: null
        notice: null
        openValue: 987.82
        parValue: 0
        percentValueChange: -0.000394649
        proprietaryTotalMatchBuyTradeValue: 112646154000
        proprietaryTotalMatchBuyTradeVolume: 3174270
        proprietaryTotalMatchSellTradeValue: 128746906300
        proprietaryTotalMatchSellTradeVolume: 3085900
        referenceDate: "0001-01-01T00:00:00"
        referenceValue: 988.22
        shareIssue: 83834128999
        split: null
        suspension: null
        totalBuyTrade: 75405
        totalBuyTradeVolume: 285278090
        totalDealValue: 965191342860
        totalDealVolume: 35747522
        totalMatchBuyTradeValue: 0
        totalMatchBuyTradeVolume: 0
        totalMatchSellTradeValue: 0
        totalMatchSellTradeVolume: 0
        totalMatchValue: 2833914600000
        totalMatchVolume: 143783620
        totalSellTrade: 68189
        totalSellTradeVolume: 304120310
        totalTrade: 77322
        totalValue: 3799105942860
        totalVolume: 179531142
        tradingDate: "2019-10-09T00:00:00"
        valueChange: -0.39
      }
    ]
    packageId: null
    page: 1
    pageSize: 60
    status: "Success"
    totalCount: 4616
  }
}

//PT KỸ THUẬT
Biểu đồ PT Kỹ thuật = {
  url: "https://technical.fiintrade.vn/TradingView/GetStockChartData?language=vi&Code=VNINDEX&Frequency=Daily&From=2017-08-28T04:18:53.000Z&To=2017-09-14T04:18:51.000Z&Type=Index",
  response: {
    errors: null
    items: [
      {
        closePrice: 774.03
        highestPrice: 777.26
        lowestPrice: 773.87
        openPrice: 773.91
        totalMatchVolume: 255981300
        tradingDate: "2017-08-29T00:00:00"
      }
    ]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}

Tín hiệu kỹ thuật = {
  url: "https://technical.fiintrade.vn/TechnicalAnalysisSignals/GetIndicators?language=vi",
  response: {
    daily: {
      cmf: 0.13761322993040634
      ma5: 40900
      roc: 0.03125
      rockPrev: 0.007352941176470588
      rsi: 100
      rsiPrev: 100
    }
    hourly: {...}
    matchPrice: 41500
    organCode: "BID"
    quarterly: {...}
    weekly: {...}
  }
}
//Tab Tín hiệu nhiễu
Tín hiệu nhiễu = {
  url: "https://technical.fiintrade.vn/TechnicalAnalysisSignals/getOverview?language=vi&WatchListId=35",
  response: {
    errors: null
    items: [
      {
        aggressive: true
        cancelled: true
        ceFl: false
        ceilingPrice: 44100
        closing: false
        floorPrice: 38400
        matchPrice: 41300
        organCode: "BID"
        percentPriceChange: 0.0012121212121212121
        pressing: false
        referencePrice: 41250
        ticker: "BID"
        totalMatchedVolume: 885680
      }
    ]
    packageId: null
    page: 1
    pageSize: 0
    status: "Success"
    totalCount: 30
  }
}
Mua trần bán sàn = {
  url: "https://technical.fiintrade.vn/TechnicalAnalysisSignals/GetCEFLAbnormality?language=vi&AbnormalityType=CeilingBuy&AverageVolume10D=100000&RateOfUnmatched=1.5",
  response: {
    errors: null
    items: []
    packageId: null
    page: 1
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}
Hủy lệnh = {
  url: "https://technical.fiintrade.vn/TechnicalAnalysisSignals/GetCancelled?language=vi&AverageVolume10D=100000",
  response: {
    errors: null
    items: [
      {
        averageMatchVolume2Week: 1931514
        cancelledBuyOrder: 195
        cancelledBuyOrderVolume: 1956000
        cancelledSellOrder: 156
        cancelledSellOrderVolume: 706900
        ceilingPrice: 20200
        floorPrice: 16600
        matchPrice: 18600
        organCode: "PVS"
        referencePrice: 18400
        ticker: "PVS"
        totalCancelledOrder: 351
        totalCancelledOrderVolume: 2662900
        totalMatchedVolume: 2313248
      }
    ]
    packageId: null
    page: 1
    pageSize: 0
    status: "Success"
    totalCount: 50
  }
}
Đề giá = {
  url: "https://technical.fiintrade.vn/TechnicalAnalysisSignals/GetPressing?language=vi&AverageVolume10D=10000&OrderType=Both&Proportion=0.1",
  response: {
    errors: null
    items: [
      {
        averageMatchVolume2Week: 1904130
        bid: 24000
        bidVolume: 325600
        ceilingPrice: 26000
        floorPrice: 21400
        matchPrice: 24100
        offer: 24300
        offerVolume: 275900
        organCode: "ACB"
        pressingType: "Both"
        rank: 6
        referencePrice: 23700
        ticker: "ACB"
        totalMatchVolume: 4680084
        totalRank: 18
      }
    ]
    packageId: null
    page: 1
    pageSize: 0
    status: "Success"
    totalCount: 60
  }
}
Mua bán chủ động = {
  url: "https://technical.fiintrade.vn/TechnicalAnalysisSignals/GetAggressive?language=vi&AverageVolume10D=100000&TotalVolumeBuSd=0.3&OrderType=LessThan",
  response: {
    errors: null
    items: [
      {
        averageMatchVolume2Week: 1302571
        ceilingPrice: 4790
        floorPrice: 4170
        matchPrice: 4470
        matchVolume: 310
        organCode: "HAG"
        rank: 38
        referencePrice: 4480
        ticker: "HAG"
        totalMatchVolume: 1084190
        totalRank: 102
        totalVolumeBuyUp: 227900
        totalVolumeSellDown: 846290
      }
    ]
    packageId: null
    page: 1
    pageSize: 0
    status: "Success"
    totalCount: 15
  }
}
Chốt phiên = {
  url: "https://technical.fiintrade.vn/TechnicalAnalysisSignals/GetClosing?language=vi&AverageVolume10D=10000&ExceedingPercentage=0.8",
  response: {
    errors: null
    items: [
      {
        averageMatchVolume2Week: 156373
        ceilingPrice: 18200
        floorPrice: 15000
        matchPrice: 16600
        organCode: "HLD"
        rank: 70
        referencePrice: 16600
        ticker: "HLD"
        totalMatchVolume: 81661
        totalRank: 120
        tradingDate: "2019-10-10T14:23:14"
        volumeAfter2pm: 49400
        volumeBefore2pm: 32261
        volumePrevious: 91500
      }
    ]
    packageId: null
    page: 1
    pageSize: 0
    status: "Success"
    totalCount: 22
  }
}
//Tab phân tích giá KL
Phân tích giá KL = {
  url: "https://technical.fiintrade.vn/TechnicalAnalysisSignals/GetPriceVolumeAnalysis?language=vi&PriceVolumeAnalysis=VolumeIncreaseAndPriceIncrease&Page=1&PageSize=10",
  response: {
    errors: null
    items: [
      {
        ceilingPrice: 25550
        floorPrice: 22250
        lastClose: 23900
        lastVolume: 161500
        matchPrice: 24850
        nrOfDay: 5
        organCode: "DBC"
        rank: 17
        referencePrice: 23900
        rsI14: 64.8936170213
        ticker: "DBC"
        totalMatchVolume: 247020
        totalRank: 102
        totalTradingTime: 4.25
        tradingDate: "2019-10-10T14:24:43"
        volumeExpected: 268366.54121991084
      }
    ]
    packageId: null
    page: 1
    pageSize: 0
    status: "Success"
    totalCount: 11
  }
}

//TIN TỨC VÀ NHẬN ĐỊNH
Tin tổng hợp = {
  url: "https://news.fiintrade.vn/News/GetAggregatorNews?language=vi&Page=1&PageSize=100&FromDate=2019-09-05T00:00:00+%2B07:00&ToDate=2019-10-03T2",
  response: {
    errors: null
    items: [
      {
        categoryName: null
        comGroupCode: null
        contributor: null
        createDate: "0001-01-01T00:00:00"
        index: null
        isFavorite: false
        newsCategoryCode: null
        newsId: 3836205
        newsShortContent: "Trước đề xuất đưa phát hành riêng lẻ trái phiếu doanh nghiệp của công ty không đại chúng quy định tại Luật Doanh nghiệp, mà không phải là Luật Chứng khoán, giới chuyên gia cho rằng, cần quy định theo hướng hài hòa giữa 2 luật để thuận lợi trong quản lý thị trường này."
        newsSourceLink: "https://tinnhanhchungkhoan.vn/trai-phieu/quan-ly-trai-phieu-doanh-nghiep-can-hai-hoa-giua-cac-luat-298592.html"
        newsTitle: "Quản lý trái phiếu doanh nghiệp: Cần hài hòa giữa các luật"
        organCode: null
        priceInfo: null
        publicDate: "2019-10-10T11:15:50"
        sourceCode: "DTCK"
        ticker: null
        trustAbility: null
      }
    ]
    packageId: null
    page: 1
    pageSize: 100
    status: "Success"
    totalCount: 410572
  }
}
Tin tự động = {
  url: "https://news.fiintrade.vn/News/GetAutoNews?language=vi&Page=1&PageSize=100&cacheKey=1570691397735&FromDate=2019-09-05T00:00:00+%2B07:00&ToDate=2019-10-03T2"
  response: {
    errors: null
    items: [
      {
        categoryName: "TA Strategy"
        comGroupCode: null
        contributor: null
        createDate: "2019-10-10T14:05:18.513"
        index: {
          ceiling: 0
          closeIndex: 0
          comGroupCode: "HNXIndex"
          floor: 0
          foreignBuyValueDeal: 0
          foreignBuyValueMatched: 1376278000
          foreignBuyValueTotal: 0
          foreignBuyVolumeDeal: 0
          foreignBuyVolumeMatched: 189890
          foreignBuyVolumeTotal: 0
          foreignCurrentRoom: 0
          foreignSellValueDeal: 0
          foreignSellValueMatched: 21358110000
          foreignSellValueTotal: 0
          foreignSellVolumeDeal: 0
          foreignSellVolumeMatched: 1123300
          foreignSellVolumeTotal: 0
          foreignTotalRoom: 0
          highestIndex: 105.830925
          indexChange: 0.806737
          indexId: 0
          indexValue: 105.426737
          lowestIndex: 104.500292
          marketStatus: ""
          matchValue: 0
          matchVolume: 0
          openIndex: 104.622448
          percentIndexChange: 0.007711116421334353
          referenceIndex: 104.62
          status: 0
          totalDealValue: 36775250000
          totalDealVolume: 4826700
          totalDownVolume: 0
          totalMatchValue: 293896351000
          totalMatchVolume: 18224229
          totalNoChangeVolume: 0
          totalStockDownPrice: 0
          totalStockNoChangePrice: 0
          totalStockOverCeiling: 0
          totalStockUnderFloor: 0
          totalStockUpPrice: 0
          totalTrade: 170
          totalUpVolume: 0
          totalValue: 330624501000
          totalVolume: 23049429
          tradingDate: "2019-10-10T14:10:06"
          typeIndex: 0
        }
        isFavorite: false
        newsCategoryCode: "FTTStra"
        newsId: 3836247
        newsShortContent: null
        newsSourceLink: null
        newsTitle: "Vượt đường dài hạn MA100"
        organCode: "PVC"
        priceInfo: {
          averagePrice: 0
          best1Bid: 0
          best1BidVolume: 0
          best1Offer: 0
          best1OfferVolume: 0
          ceilingPrice: 7300
          closePrice: 0
          comGroupCode: "HNXIndex"
          dealPrice: 0
          dealValue: 0
          dealVolume: 0
          floorPrice: 6100
          foreignBuyValueDeal: 0
          foreignBuyValueMatched: 0
          foreignBuyValueTotal: 0
          foreignBuyVolumeDeal: 0
          foreignBuyVolumeMatched: 0
          foreignBuyVolumeTotal: 0
          foreignCurrentRoom: 18260638
          foreignSellValueDeal: 0
          foreignSellValueMatched: 0
          foreignSellValueTotal: 0
          foreignSellVolumeDeal: 0
          foreignSellVolumeMatched: 0
          foreignSellVolumeTotal: 0
          foreignTotalRoom: 0
          highestPrice: 6900
          lowestPrice: 6700
          marketStatus: null
          matchPrice: 6900
          matchType: 0
          matchValue: 0
          matchVolume: 0
          openPrice: 6700
          organCode: "PVC"
          percentPriceChange: 0.029850746268656716
          priceChange: 200
          referenceDate: "2019-10-10T08:45:03.9565209+07:00"
          referencePrice: 6700
          ticker: "PVC"
          totalBuyTradeVolume: 237200
          totalDealValue: 0
          totalDealVolume: 0
          totalMatchValue: 1079380000
          totalMatchVolume: 159800
          totalSellTradeVolume: 481100
          totalValue: 1079380000
          totalVolume: 159800
          tradingDate: "2019-10-10T14:10:16"
        }
        publicDate: "0001-01-01T00:00:00"
        sourceCode: null
        ticker: "PVC"
        trustAbility: null
      }
    ]
    packageId: null
    page: 1
    pageSize: 100
    status: "Success"
    totalCount: 235
  }
}
Phân tích chuyên sâu = {
  url: "https://news.fiintrade.vn/News/GetPremiumAnalysis?language=vi&Page=1&PageSize=100&FromDate=2019-09-05T00:00:00+%2B07:00&ToDate=2019-10-03T2",
  response: {
    errors: null
    items: [
      {
        categoryName: null
        comGroupCode: null
        contributor: null
        createDate: "0001-01-01T00:00:00"
        index: null
        isFavorite: false
        newsCategoryCode: null
        newsId: 3784135
        newsShortContent: "Theo thông báo từ Sở giao dịch chứng khoán Hà Nội, 12,64 triệu cổ phiếu của CTCP Du lịch và Tiếp thị Giao thông Vận tải Việt Nam (Vietravel) sẽ được đưa vào giao dịch trên thị trường UPCoM với mã chứng khoán VTR từ ngày 27/9/2019."
        newsSourceLink: null
        newsTitle: "Viettravel có thể cất cánh hay không?"
        organCode: "VIETRA"
        priceInfo: null
        publicDate: "2019-09-27T14:27:33"
        sourceCode: " FiinPro Data t"
        ticker: "VTR"
        trustAbility: null
      }
    ]
    packageId: null
    page: 1
    pageSize: 100
    status: "Success"
    totalCount: 0
  }
}
Nhận định chuyên gia = {
  url: "https://news.fiintrade.vn/News/GetMostRecent?language=vi&Page=1&PageSize=100&FromDate=2019-09-05T00:00:00+%2B07:00&ToDate=2019-10-03T2",
  response: {
    errors: null
    items: [
      {
        categoryName: null
        comGroupCode: null
        contributor: null
        createDate: "0001-01-01T00:00:00"
        index: null
        isFavorite: false
        newsCategoryCode: null
        newsId: 3534629
        newsShortContent: "REE - Bluechip rẻ nhất thị trường phát tín hiệu vào sóng V lớn- (DVC đã khuyến nghị mua từ tháng 5 và bị om khá lâu quanh vùng 32 - 33)"
        newsSourceLink: "https://www.facebook.com/duong.vanchung.3/posts/2355031614562246"
        newsTitle: "REE - Bluechip rẻ nhất thị trường phát tín hiệu vào sóng V lớn"
        organCode: "REE"
        priceInfo: null
        publicDate: "2019-07-30T17:19:31"
        sourceCode: "Dương Văn Chung"
        ticker: "REE"
        trustAbility: null
      }
    ]
    packageId: null
    page: 1
    pageSize: 100
    status: "Success"
    totalCount: 11
  }
}
Tin đồn = {
  url: "https://news.fiintrade.vn/News/GetRumors?language=vi&Page=1&PageSize=100&FromDate=2019-09-05T00:00:00+%2B07:00&ToDate=2019-10-03T2",
  response: {
    errors: null
    items: [
      {
        categoryName: null
        comGroupCode: null
        contributor: null
        createDate: "0001-01-01T00:00:00"
        index: null
        isFavorite: false
        newsCategoryCode: null
        newsId: 3513572
        newsShortContent: "Mới đây Bloomberg tiết lộ 2 đối tác tiềm năng đang đàm phán cho hợp đồng phân phối bảo hiểm độc quyền qua VCB là Prudentail và FWD. "
        newsSourceLink: "http://f319.com/threads/bloomberg-tiet-lo-doi-tac-cua-vcb-phan-phoi-bao-hiem.1326763/"
        newsTitle: "VCB: Bloomberg tiết lộ đối tác của VCB phân phối bảo hiểm"
        organCode: "VCB"
        priceInfo: null
        publicDate: "2019-07-25T16:21:29"
        sourceCode: "Bloomberg"
        ticker: "VCB"
        trustAbility: "High"
      }
    ]
    packageId: null
    page: 1
    pageSize: 100
    status: "Success"
    totalCount: 0
  }
}

//PHÂN TÍCH CƠ BẢN
//Báo cáo doanh nghiệp
Get snapshot = {
  url: "https://fundamental.fiintrade.vn/Snapshot/GetSnapshot?language=vi&OrganCode=AAA",
  response: {
    errors: null
    items: [
      {
        quarterly: [
          {
            bsa1: 1332235848924
            bsa23: 2040472363336
            bsa53: 3372708212260
            bsa54: 2199719244789
            bsa78: 1172988967471
            bsa80: 592499880000
            bsb98: 0
            bsb104: 0
            bsb113: 0
            cfa18: 173242846546
            cfa26: -292213659208
            cfa34: -145716323392
            isa1: 853825654192
            isa22: 39129314217
            isb27: 0
            isi103: 0
            nob44: null
            quarter: 2
            rqq41: null
            rtq1: 0.199875821
            rtq2: 0.8262764824
            rtq3: 1.2367659139
            rtq25: 0.1458355889
            rtq29: 0.0722123853
            rtq44: 0
            rtq137: 0
            year: 2017
          }
        ]
        summary: {
          averageMatchVolume1Month: 1711619
          ceo: "Nguyễn Lê Trung"
          competitors: " DGC, DHB"
          foreignerPercentage: 0.0234
          freeFloat: 94159987
          highestPrice1Year: 18940
          lowestPrice1Year: 13113
          majorHoldings: 0.4662
          organCode: null
          outstandingShare: 171199976
          rtd11: 2533759644800
          rtd14: 2582.8460466133
          rtd21: 5.7301131128
          rtd25: 0.8744582628
          rtd53: 2978.9723802298
          rtq10: 1.5917858375
          rtq12: 0.143675756
          rtq14: 0.0576333264
          rtq29: 0.049325181
          statePercentage: 0
          valuePerShare: 500
        }
        yearly: {
          bsa1: 495025008321
          bsa23: 655544196312
          bsa53: 1150569204633
          bsa54: 598551168719
          bsa78: 543446500724
          bsa80: 198000000000
          bsb98: null
          bsb104: null
          bsb113: null
          cfa18: 83524444454
          cfa26: -208641504518
          cfa34: 151816133253
          isa1: 1158676596112
          isa22: 54935816239
          isb27: null
          isi103: null
          nob44: null
          quarter: 0
          rqq41: null
          rtq1: 0.2527153215
          rtq2: 0.5377811597
          rtq3: 0.9603404499
          rtq25: 0.154241018
          rtq29: 0.0479232554
          rtq44: 0
          rtq137: 0
          year: 2013
        }
      }
    ]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}
Get company score = {
  url: "https://fundamental.fiintrade.vn/Snapshot/GetCompanyScore?language=vi&OrganCode=AAA",
  response: {
    errors: null
    items: [
      {
        comGroupCode: null
        controlStatusCode: -1
        controlStatusName: "Bình thường"
        growth: "A"
        icbCode: "1350"
        icbRank: 2
        icbTotalRanked: 68
        indexRank: null
        indexTotalRanked: null
        momentum: "B"
        organCode: "AAA"
        value: "C"
        vgm: "B"
      }
    ]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}
Get ticker series = {
  url: "https://market.fiintrade.vn/WatchList/GetTickerSeries?language=vi&OrganCode=AAA&TimeRange=OneYear&id=1",
  response: {
    errors: null
    items: [
      {
        ceilingPrice: 16950
        closePrice: 14326.675
        floorPrice: 14750
        foreignBuyValueDeal: 0
        foreignBuyValueMatched: 1517075000
        foreignBuyVolumeDeal: 0
        foreignBuyVolumeMatched: 102500
        foreignSellValueDeal: 0
        foreignSellValueMatched: 12517747000
        foreignSellVolumeDeal: 0
        foreignSellVolumeMatched: 837250
        highestPrice: 14763.76
        lowestPrice: 14326.675
        matchPrice: 14750
        matchValue: 47189000000
        matchVolume: 3166590
        openPrice: 14569.5
        organCode: "AAA"
        percentPriceChange: 0
        priceChange: 0
        referencePrice: 15395.105
        ticker: "AAA"
        totalMatchValue: 47189000000
        totalMatchVolume: 3166590
        tradingDate: "2018-10-11T00:00:00"
      }
    ]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 248
  }
}
Get lastest price = {
  url: "https://technical.fiintrade.vn/PriceData/GetLatestPrice?language=vi&OrganCode=AAA&Code=AAA",
  response: {
    errors: null
    items: [
      {
        bidAskInfo: {
          best1Bid: 14850
          best1BidVolume: 3910
          best1Offer: 14900
          best1OfferVolume: 44750
          best2Bid: 14800
          best2BidVolume: 84880
          best2Offer: 14950
          best2OfferVolume: 39300
          best3Bid: 14750
          best3BidVolume: 133730
          best3Offer: 15000
          best3OfferVolume: 150130
          best4Bid: 0
          best4BidVolume: 0
          best4Offer: 0
          best4OfferVolume: 0
          best5Bid: 0
          best5BidVolume: 0
          best5Offer: 0
          best5OfferVolume: 0
          best6Bid: 0
          best6BidVolume: 0
          best6Offer: 0
          best6OfferVolume: 0
          best7Bid: 0
          best7BidVolume: 0
          best7Offer: 0
          best7OfferVolume: 0
          best8Bid: 0
          best8BidVolume: 0
          best8Offer: 0
          best8OfferVolume: 0
          best9Bid: 0
          best9BidVolume: 0
          best9Offer: 0
          best9OfferVolume: 0
          best10Bid: 0
          best10BidVolume: 0
          best10Offer: 0
          best10OfferVolume: 0
          comGroupCode: "VNINDEX"
          organCode: "AAA"
          tradingDate: "2019-10-10T14:46:57"
        }
        priceInfo: {
          averagePrice: 0
          best1Bid: 14850
          best1BidVolume: 3910
          best1Offer: 14900
          best1OfferVolume: 44750
          ceilingPrice: 15800
          closePrice: 14900
          comGroupCode: "VNINDEX"
          dealPrice: 0
          dealValue: 0
          dealVolume: 0
          floorPrice: 13800
          foreignBuyValueDeal: 0
          foreignBuyValueMatched: 0
          foreignBuyValueTotal: 0
          foreignBuyVolumeDeal: 0
          foreignBuyVolumeMatched: 0
          foreignBuyVolumeTotal: 0
          foreignCurrentRoom: 63697080
          foreignSellValueDeal: 0
          foreignSellValueMatched: 452960000
          foreignSellValueTotal: 452960000
          foreignSellVolumeDeal: 0
          foreignSellVolumeMatched: 0
          foreignSellVolumeTotal: 30400
          foreignTotalRoom: 67709590
          highestPrice: 15000
          lowestPrice: 14800
          marketStatus: null
          matchPrice: 14900
          matchType: 1
          matchValue: 870000000
          matchVolume: 58380
          openPrice: 14850
          organCode: "AAA"
          percentPriceChange: 0.006756756756756757
          priceChange: 100
          referenceDate: "0001-01-01T00:00:00"
          referencePrice: 14800
          ticker: "AAA"
          totalBuyTradeVolume: 0
          totalDealValue: 0
          totalDealVolume: 0
          totalMatchValue: 18961000000
          totalMatchVolume: 1271470
          totalSellTradeVolume: 0
          totalValue: 18961000000
          totalVolume: 1271470
          tradingDate: "2019-10-10T14:46:57"
        }
      }
    ]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}

//Sở hữu và GD nội bộ
Get ownership = {
  url: "https://fundamental.fiintrade.vn/Ownership/GetOwnership?language=vi&OrganCode=AAA",
  response: {
    errors: null
    items: [
      {
        boardOfDirectors: [
          {
            fullName: "Phạm Ánh Dương"
            isRelationship: false
            percentage: 0
            personId: 9359
            positionName: "Chủ tịch Hội đồng Quản trị, Phụ trách Công bố thông tin"
            publicDate: "2018-12-31T16:57:48"
            quantity: 0
          }
        ]
        majorOwnershipsChartData: [{item1: "Công ty Cổ phần An Phát Holdings", item2: 0.4662}]
        majorShareHolders: [
          {
            isFounder: false
            ownerTypeCode: null
            percentage: 0.4662
            percentageAdjusted: 0
            publicDate: "2018-12-31T15:14:36"
            quantity: 79817140
            quantityAdjusted: 0
            shareHolderCode: "APHOLD"
            shareHolderName: "Công ty Cổ phần An Phát Holdings"
            shareHolderType: "Individual"
          }
        ]
        overviewChartData: {
          item1: "Sở hữu nhà nước"
          item2: 0
        }
      }
    ]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}
Get company score = {
  url: "https://fundamental.fiintrade.vn/Snapshot/GetCompanyScore?language=vi&OrganCode=AAA",
  response: {
    errors: null
    items: [
      {
        comGroupCode: null
        controlStatusCode: -1
        controlStatusName: "Bình thường"
        growth: "A"
        icbCode: "1350"
        icbRank: 2
        icbTotalRanked: 68
        indexRank: null
        indexTotalRanked: null
        momentum: "B"
        organCode: "AAA"
        value: "C"
        vgm: "B"
      }
    ]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}
Download = {
  url: "https://fundamental.fiintrade.vn/Ownership/DownloadMajorShareHolder?language=vi&OrganCode=AAA",
  response: file
}

//Phân tích tài chính
Phân tích nhanh = {
  url: "https://fundamental.fiintrade.vn/FinancialAnalysis/GetCheckup?language=vi&OrganCode=AAA",
  response: {
    errors: null
    items: [
      {
        checkupItem: {
          checkupInfors: [
            {
              rateComment: "Doanh nghiệp tăng vốn nhanh với mức tăng 2.7 lần trong vòng 3 năm"
              rateIndicatorId: 5
              rateIndicatorName: "FA_Phát hành tăng vốn"
              rateResult: "Alert"
              rateValue: null
            }
          ]
          lengthReport: 2
          marketCap: 2533759644800
          organCode: "AAA"
          organShortName: "An Phat Bioplastics"
          ticker: "AAA"
          yearReport: 2019
        }
        comparingCheckupItems: [
          {
            checkupInfors: [
              {
                rateComment: "Không có dấu hiệu bất thường"
                rateIndicatorId: 5
                rateIndicatorName: "FA_Phát hành tăng vốn"
                rateResult: "Neutral"
                rateValue: null
              }
            ]
            lengthReport: 2
            marketCap: 54636000000000
            organCode: "VNRG"
            organShortName: "Tập đoàn CN Cao su VN"
            ticker: "GVR"
            yearReport: 2019
          }
        ]
        organCode: "AAA"
      }
    ]
    packageId: null
    page: 1
    pageSize: 0
    status: "Success"
    totalCount: 1
  }
}
Chỉ số = {
  url: "https://fundamental.fiintrade.vn/FinancialAnalysis/GetFinancialRatio?language=vi&OrganCode=AAA",
  response: {
    errors: null
    items: [
      {
        comTypeCode: "CT"
        icbCode: "1350"
        isBank: false
        organCode: "AAA"
        ratios: [
          {
            bsa53: null
            bsb103: null
            lengthReport: 2
            lengthReportCal: 2
            rtd3: 171199976
            rtd7: 16924.7643138571
            rtd11: 2533759644800
            rtd14: 2582.8460466133
            rtd20: 0.0337837838
            rtd21: 5.7301131128
            rtd25: 0.8744582628
            rtd26: 0.2684692074
            rtd28: 25.9146300879
            rtd30: 7.3363800054
            rtd51: 0.1935849025
            rtq1: 0.0785509905
            rtq3: 1.611163435
            rtq12: 0.143675756
            rtq14: 0.0576333264
            rtq16: 37.9679943661
            rtq18: 55.8295887987
            rtq20: 27.3415398841
            rtq23: 0.0363244277
            rtq25: 0.1082215755
            rtq29: 0.049325181
            rtq31: 1.2358001782
            rtq44: null
            rtq45: null
            rtq46: null
            rtq47: null
            rtq50: null
            rtq51: null
            rtq54: null
            rtq55: null
            rtq56: null
            rtq57: null
            rtq58: null
            rtq59: null
            rtq60: null
            rtq61: null
            rtq67: null
            rtq69: null
            rtq71: 2.5917858375
            rtq77: 3.40831743
            rtq78: 0.0482502526
            rtq81: 5.3196877627
            rtq83: 2.5970409772
            rtq118: null
            ryd20: null
            ryd51: null
            yearReport: 2019
            yearReportCal: 2019
          }
        ]
        ratiosIndustry: {
          icbCode: "1350"
          rsd3: 7678846973
          rsd7: 13645.4066419916
          rsd11: 104327348480838
          rsd14: 1672.8194107409
          rsd20: 0.0427273329
          rsd21: 14.0548620339
          rsd25: 1.0647201433
          rsd26: 2.2054670168
          rsd28: 15.0053575677
          rsd30: 16.450570815
          rsd51: 0.2508521585
          rsq1: 0.5252775425
          rsq3: 2.2355980163
          rsq12: -0.0539845682
          rsq14: 0.0500962575
          rsq16: 30.356805174
          rsq18: 82.5627796556
          rsq20: 24.3526028343
          rsq23: null
          rsq25: 0.1919549813
          rsq29: 0.1471415122
          rsq31: 0.5446771049
          rsq34: 0.2632181729
          rsq37: 0.0578616103
          rsq39: 0.8656675873
          rsq44: 0
          rsq45: 0
          rsq46: 0
          rsq47: 0
          rsq50: 0
          rsq51: 0
          rsq57: 0
          rsq58: 0
          rsq59: 0
          rsq60: 0
          rsq61: 0
          rsq67: 0
          rsq71: 0
          rsq77: null
          rsq118: 0
          rtq12Max: 0.610794491
          rtq14Max: 0.2760256072
          rtq25Max: 0.6712718034
          rtq29Max: 0.7163859129
          rtq44Max: 0
          rtq45Max: 0
        }
      }
    ]
    packageId: null
    page: 1
    pageSize: 0
    status: "Success"
    totalCount: 1
  }
}
Điểm ZMF = {
  url: "https://fundamental.fiintrade.vn/FinancialAnalysis/GetZMFScore?language=vi&OrganCode=AAA",
  response: {
    errors: null
    items: [
      {
        organCode: "AAA"
        scorings: {
          fScore: 5
          mScore: 0.7462129593
          yearReport: 2018
          zScore: 1.7413659548
        }
      }
    ]
    packageId: null
    page: 1
    pageSize: 0
    status: "Success"
    totalCount: 1
  }
}

//Cổ tức và dự báo
Get Analysis = {
  url: "https://fundamental.fiintrade.vn/CashDividendAnalysis/GetAnalysis?language=vi&OrganCode=AAA&Code=AAA",
  response: {
    errors: null
    items: [
      {
        cashDividendPayouts: [{valuePerShare: 500, exrightYear: 2019, exrightMonth: 8}]
        cashDividendPlans: [{dividendYear: 2019, valuePerShare: 2000}]
        dividendPayoutRatio: {
          ratioTTM: 0.1935849025
          ratioYears: [{yearReport: 2018, ratioValue: 0}}
        dividendYield: {
          ratioTTM: 0.0337837838
          ratioYears: [{yearReport: 2018, ratioValue: 0}}
        dps: {
          ratioTTM: 500
          ratioYears: [{yearReport: 2018, ratioValue: 0}}
        eps: {
          ratioTTM: 2582.8460466133
          ratioYears: {
            ratioValue: 953.0916433715
            yearReport: 2018
          }
        }
        organCode: "AAA"
        priceEarningRatio: {
          ratioTTM: 5.7301131128
          ratioYears: {
            ratioValue: 15.5284123021
            yearReport: 2018
          }
        }
      }
    ]
    packageId: null
    page: 1
    pageSize: 0
    status: "Success"
    totalCount: 1
  }
}

//Phân tích Consensus
GetConsensus = {
  url: "https://fundamental.fiintrade.vn/ConsensusAnalysis/GetConsensus?language=vi&OrganCode=AAA",
  response: {
    errors: null
    items: [
      {
        organCode: "AAA"
        recommendationHistories: [{
          recommendations: [{
            localRecommendationTypeName: "Mua"
            numOfReport: 0
            publicDate: null
            recommendationTypeCode: "BUY"
            reportDate: null
          }]
          reportDate: "2017-10-01T00:00:00"
        }]
        recommendations: [{
          localRecommendationTypeName: "Mua"
          numOfReport: 52
          publicDate: "2019-09-12T00:00:00"
          recommendationTypeCode: "BUY"
          reportDate: "2019-09-12T00:00:00"
        }]
        targetPrice: {
          averagePrice: 20316
          closePrice: 14800
          closePriceAdjusted: 14800
          highestPrice: 28100
          lowestPrice: 17040
        }
        targetPriceHistories: [{
          actualPrice: 30000
          numOfRating: 4
          reportDate: "2017-11-08T00:00:00"
          targetPrice: 37100
        }]
      }
    ]
    packageId: null
    page: 1
    pageSize: 0
    status: "Success"
    totalCount: 1
  }
}

//Báo cáo tài chính
Cân đối kế toán = {
  url: "https://fundamental.fiintrade.vn/FinancialStatement/GetBalanceSheet?language=vi&OrganCode=AAA",
  response: {
    errors: null
    items: [
      {
        quarterly: [{
          bsI141: 253130500
          bsS134: 0
          bsa1: 5566536029038
          bsa2: 271392032211
          bsa3: 168132532211
          bsa4: 103259500000
          bsa5: 1096424484079
          bsa6: 0
          bsa7: 0
          bsa8: 2903327855891
          bsa9: 1302033537210
          bsa10: 912663107595
          bsa11: 0
          bsa12: 0
          bsa13: 190932498086
          bsa14: 0
          bsa15: 1126772362258
          bsa16: 1127872132637
          bsa17: -1099770379
          bsa18: 168619294599
          bsa19: 35023152927
          bsa20: 130119852539
          bsa21: 3476289133
          bsa22: 0
          bsa23: 2784771683883
          bsa24: 20936778548
          bsa25: 0
          bsa26: 0
          bsa27: 20936778548
          bsa28: 0
          bsa29: 2144952044113
          bsa30: 2061490503434
          bsa31: 2918996858194
          bsa32: -857506354760
          bsa33: 0
          bsa34: 0
          bsa35: 0
          bsa36: 83461540679
          bsa37: 94825808865
          bsa38: -11364268186
          bsa39: 0
          bsa40: 95658391772
          bsa41: 95807104290
          bsa42: -148712518
          bsa43: 43180000000
          bsa44: 0
          bsa45: 4800000000
          bsa46: 0
          bsa47: 0
          bsa48: 0
          bsa49: 163218545702
          bsa50: 162293980769
          bsa51: 924564933
          bsa52: 0
          bsa53: 8351307712921
          bsa54: 5129086342647
          bsa55: 3454979121357
          bsa56: 2629631283217
          bsa57: 635433910651
          bsa58: 36648061601
          bsa59: 54801796060
          bsa60: 17509915550
          bsa61: 33734679325
          bsa62: 0
          bsa63: 0
          bsa64: 4021200243
          bsa65: 0
          bsa66: 6611634054
          bsa67: 1674107221290
          bsa68: 0
          bsa69: 0
          bsa70: 1655818739
          bsa71: 1561978272487
          bsa72: 23445246337
          bsa73: 0
          bsa74: 0
          bsa76: 87027883727
          bsa77: 0
          bsa78: 3222221370274
          bsa79: 3222221370274
          bsa80: 1711999760000
          bsa81: 532112689329
          bsa82: 0
          bsa83: 0
          bsa84: 0
          bsa85: -585951213
          bsa86: 67258859051
          bsa87: 0
          bsa89: 13177404323
          bsa90: 573556482848
          bsa91: 0
          bsa92: 0
          bsa93: 0
          bsa94: 0
          bsa95: 0
          bsa96: 8351307712921
          bsa159: 497445582500
          bsa160: 0
          bsa161: 0
          bsa162: 0
          bsa163: 316825923748
          bsa164: 0
          bsa165: 38380000000
          bsa166: 0
          bsa167: 36586640656
          bsa168: 0
          bsa169: 0
          bsa170: 0
          bsa171: 0
          bsa172: 0
          bsa173: 0
          bsa175: 1711999760000
          bsa176: 0
          bsa177: 227819971018
          bsa178: 345736511830
          bsa210: 324702125936
          bsa211: 0
          bsb97: 0
          bsb98: 0
          bsb99: 0
          bsb100: 0
          bsb101: 0
          bsb102: 0
          bsb103: 0
          bsb104: 0
          bsb105: 0
          bsb106: 0
          bsb107: 0
          bsb108: 1096424484079
          bsb109: 0
          bsb110: 0
          bsb111: 0
          bsb112: 0
          bsb113: 0
          bsb114: 0
          bsb115: 0
          bsb116: 0
          bsb117: 0
          bsb118: 0
          bsb119: 0
          bsb120: 0
          bsb121: 0
          bsb174: null
          otherAssetBank: 8351307712921
          otherAssetNonBank: 639819639770
          otherLiabilties: 5129086342647
          quarterReport: 2
          yearReport: 2019
        }]
        yearly: {
          bsI141: 0
          bsS134: 0
          bsa1: 3989369447153
          bsa2: 645474843425
          bsa3: 217635249378
          bsa4: 427839594047
          bsa5: 720906460274
          bsa6: 0
          bsa7: 0
          bsa8: 1612785115376
          bsa9: 691606956768
          bsa10: 531565397491
          bsa11: 0
          bsa12: 0
          bsa13: 95914591448
          bsa14: 0
          bsa15: 862749230434
          bsa16: 865499747965
          bsa17: -2750517531
          bsa18: 147453797644
          bsa19: 21081856490
          bsa20: 123666085695
          bsa21: 2705855459
          bsa22: 0
          bsa23: 3539797275250
          bsa24: 21384352467
          bsa25: 0
          bsa26: 0
          bsa27: 21384352467
          bsa28: 0
          bsa29: 2198807465735
          bsa30: 2113821537013
          bsa31: 2858372141820
          bsa32: -744550604807
          bsa33: 0
          bsa34: 0
          bsa35: 0
          bsa36: 84985928722
          bsa37: 94894558865
          bsa38: -9908630143
          bsa39: 0
          bsa40: 0
          bsa41: 0
          bsa42: 0
          bsa43: 48380000000
          bsa44: 0
          bsa45: 0
          bsa46: 0
          bsa47: 0
          bsa48: 0
          bsa49: 63216753151
          bsa50: 62507261342
          bsa51: 709491809
          bsa52: 0
          bsa53: 7529166722403
          bsa54: 4548916573712
          bsa55: 3206103405725
          bsa56: 2492406692801
          bsa57: 622778663874
          bsa58: 43876545842
          bsa59: 14084998080
          bsa60: 19601493769
          bsa61: 8985258785
          bsa62: 0
          bsa63: 0
          bsa64: 3292201538
          bsa65: 0
          bsa66: 624409218
          bsa67: 1342813167987
          bsa68: 0
          bsa69: 0
          bsa70: 0
          bsa71: 1342803889822
          bsa72: 9278165
          bsa73: 0
          bsa74: 0
          bsa76: 0
          bsa77: 0
          bsa78: 2980250148691
          bsa79: 2980250148691
          bsa80: 1711999760000
          bsa81: 532112689329
          bsa82: 0
          bsa83: 0
          bsa84: 0
          bsa85: -39715243
          bsa86: 57775383144
          bsa87: 0
          bsa89: 13177404323
          bsa90: 265860134664
          bsa91: 0
          bsa92: 0
          bsa93: 0
          bsa94: 0
          bsa95: 0
          bsa96: 7529166722403
          bsa159: 293698169669
          bsa160: 0
          bsa161: 0
          bsa162: 0
          bsa163: 1208008703897
          bsa164: 0
          bsa165: 48380000000
          bsa166: 0
          bsa167: 453141818
          bsa168: 0
          bsa169: 0
          bsa170: 0
          bsa171: 0
          bsa172: 0
          bsa173: 0
          bsa175: 1711999760000
          bsa176: 0
          bsa177: 85599659664
          bsa178: 180260475000
          bsa210: 399364492474
          bsa211: 0
          bsb97: 0
          bsb98: 0
          bsb99: 0
          bsb100: 0
          bsb101: 0
          bsb102: 0
          bsb103: 0
          bsb104: 0
          bsb105: 0
          bsb106: 0
          bsb107: 0
          bsb108: 720906460274
          bsb109: 0
          bsb110: 0
          bsb111: 0
          bsb112: 0
          bsb113: 0
          bsb114: 0
          bsb115: 0
          bsb116: 0
          bsb117: 0
          bsb118: 0
          bsb119: 0
          bsb120: 0
          bsb121: 0
          bsb174: null
          otherAssetBank: 7529166722403
          otherAssetNonBank: 1340989809515
          otherLiabilties: 4548916573712
          quarterReport: 5
          yearReport: 2018
        }
      }
    ]
    packageId: null
    page: 1
    pageSize: 0
    status: "Success"
    totalCount: 1
  }
}
Download = {
  url: "https://fundamental.fiintrade.vn/FinancialStatement/DownloadBalanceSheet?language=vi&OrganCode=AAA&Skip=0&Frequency=Yearly",
  response: file
}
Kết quả kinh doanh = {
  url: "https://fundamental.fiintrade.vn/FinancialStatement/GetIncomeStatement?language=vi&OrganCode=AAA",
  response: {
    errors: null
    items: [{
      quarterly: [
        {
          isa1: 2438667426222
          isa2: -8633028459
          isa3: 2430034397763
          isa4: -2138619937880
          isa5: 291414459883
          isa6: 40394208201
          isa7: -82288903731
          isa8: -70292067113
          isa9: -53853853069
          isa10: -34954472795
          isa11: 160711438489
          isa12: 1545544420
          isa13: -1141168616
          isa14: 404375804
          isa15: 0
          isa16: 161115814293
          isa17: -10749983616
          isa18: -9905581615
          isa19: -20655565231
          isa20: 140460249062
          isa21: 8761205672
          isa22: 131699043390
          isa23: 0
          isa24: 0
          isa102: 0
          isb25: 0
          isb26: 0
          isb27: 0
          isb28: 0
          isb29: 0
          isb30: 0
          isb31: 0
          isb32: 0
          isb33: 0
          isb34: 0
          isb35: 0
          isb36: 0
          isb37: 0
          isb38: 0
          isb39: 0
          isb40: 0
          isb41: 0
          isi51: 0
          isi52: 0
          isi53: 0
          isi54: 0
          isi55: 0
          isi56: 0
          isi57: 0
          isi58: 0
          isi59: 0
          isi60: 0
          isi61: 0
          isi62: 0
          isi63: 0
          isi64: 0
          isi65: 0
          isi66: 0
          isi67: 0
          isi68: 0
          isi69: 0
          isi70: 0
          isi71: 0
          isi72: 0
          isi73: 0
          isi74: 0
          isi75: 0
          isi76: 0
          isi77: 0
          isi78: 0
          isi79: 0
          isi80: 0
          isi81: 0
          isi82: 0
          isi83: 0
          isi84: 0
          isi85: 0
          isi86: 0
          isi87: 0
          isi88: 0
          isi89: 0
          isi90: 0
          isi91: 0
          isi92: 0
          isi93: 0
          isi94: 0
          isi95: 0
          isi96: 0
          isi97: 0
          isi98: 0
          isi99: 0
          isi100: 0
          isi101: 0
          isi103: 0
          isi104: 0
          isi105: 0
          isi106: 0
          isi107: 0
          isi108: 0
          isi109: 0
          isi110: 0
          isi111: 0
          isi112: 0
          isi113: 0
          isi114: 0
          isi168: 0
          isi169: 0
          isi170: 0
          isi171: 0
          isi172: 0
          isi173: 0
          organCode: "AAA"
          quarterReport: 2
          rtq29: 0.049325181
          yearReport: 2019
        }
      ]
      yearly: {
        isa1: 8018827145835
        isa2: -7254532446
        isa3: 8011572613389
        isa4: -7338636540198
        isa5: 672936073191
        isa6: 61517601742
        isa7: -208587237486
        isa8: -125980474352
        isa9: -156562809984
        isa10: -123618312196
        isa11: 245685315267
        isa12: 11209698006
        isa13: -2910690089
        isa14: 8299007917
        isa15: 0
        isa16: 253984323184
        isa17: -42772027927
        isa18: 936618304
        isa19: -41835409623
        isa20: 212148913561
        isa21: 31888438561
        isa22: 180260475000
        isa23: 1115
        isa24: 0
        isa102: 0
        isb25: 0
        isb26: 0
        isb27: 0
        isb28: 0
        isb29: 0
        isb30: 0
        isb31: 0
        isb32: 0
        isb33: 0
        isb34: 0
        isb35: 0
        isb36: 0
        isb37: 0
        isb38: 0
        isb39: 0
        isb40: 0
        isb41: 0
        isi51: 0
        isi52: 0
        isi53: 0
        isi54: 0
        isi55: 0
        isi56: 0
        isi57: 0
        isi58: 0
        isi59: 0
        isi60: 0
        isi61: 0
        isi62: 0
        isi63: 0
        isi64: 0
        isi65: 0
        isi66: 0
        isi67: 0
        isi68: 0
        isi69: 0
        isi70: 0
        isi71: 0
        isi72: 0
        isi73: 0
        isi74: 0
        isi75: 0
        isi76: 0
        isi77: 0
        isi78: 0
        isi79: 0
        isi80: 0
        isi81: 0
        isi82: 0
        isi83: 0
        isi84: 0
        isi85: 0
        isi86: 0
        isi87: 0
        isi88: 0
        isi89: 0
        isi90: 0
        isi91: 0
        isi92: 0
        isi93: 0
        isi94: 0
        isi95: 0
        isi96: 0
        isi97: 0
        isi98: 0
        isi99: 0
        isi100: 0
        isi101: 0
        isi103: 0
        isi104: 0
        isi105: 0
        isi106: 0
        isi107: 0
        isi108: 0
        isi109: 0
        isi110: 0
        isi111: 0
        isi112: 0
        isi113: 0
        isi114: 0
        isi168: null
        isi169: null
        isi170: null
        isi171: null
        isi172: null
        isi173: null
        organCode: "AAA"
        quarterReport: 5
        rtq29: 0.0264803084
        yearReport: 2018
      }
    }]
    packageId: null
    page: 1
    pageSize: 0
    status: "Success"
    totalCount: 1
  }
}
Download = {
  url: "https://fundamental.fiintrade.vn/FinancialStatement/DownloadIncomeStatement?language=vi&OrganCode=AAA&Skip=0&Frequency=Yearly",
  response: file 
}
Lưu chuyển tiền tệ = {
  url: "https://fundamental.fiintrade.vn/FinancialStatement/GetCashFlow?language=vi&OrganCode=AAA",
  response: {
    errors: null
    items: [{
      quarterly: {
        cfa1: 161115814293
        cfa2: 62646642950
        cfa3: 1099770379
        cfa4: 8324404521
        cfa5: 0
        cfa6: -33597700799
        cfa7: 78838332261
        cfa8: 0
        cfa9: 278427263605
        cfa10: -160789159433
        cfa11: -451643010620
        cfa12: 562918347171
        cfa13: -18951026433
        cfa14: -73029078537
        cfa15: -6522990516
        cfa16: -12000000000
        cfa17: -34454226221
        cfa18: 83956119016
        cfa19: -249525769880
        cfa20: 1449703273
        cfa21: -751586664767
        cfa22: 396227077080
        cfa23: 75200000000
        cfa24: 21000000000
        cfa25: -5771457421
        cfa26: -513007111715
        cfa27: 0
        cfa28: 0
        cfa29: 2237245357301
        cfa30: -2018879546722
        cfa31: 0
        cfa32: -780175000
        cfa33: 0
        cfa34: 217585635579
        cfa35: -211465357120
        cfa36: 482425462169
        cfa37: 431927162
        cfa38: 271392032211
        cfa43: 0
        cfa103: 0
        cfa104: 0
        cfa105: 0
        cfb48: 0
        cfb49: 0
        cfb50: 0
        cfb51: 0
        cfb52: 0
        cfb53: 0
        cfb54: 0
        cfb55: 0
        cfb56: 0
        cfb57: 0
        cfb58: 0
        cfb59: 0
        cfb60: 0
        cfb61: 0
        cfb62: 0
        cfb63: 0
        cfb64: 0
        cfb65: 0
        cfb66: 0
        cfb67: 0
        cfb68: 0
        cfb69: 0
        cfb70: 0
        cfb71: 0
        cfb72: 0
        cfb73: 0
        cfb74: 0
        cfb75: 0
        cfb76: 0
        cfb77: 0
        cfb78: 0
        cfb79: 0
        cfb80: 0
        cfb81: 0
        cfb106: 0
        organCode: "AAA"
        quarterReport: 2
        yearReport: 2019
      }
      yearly: {
        cfa1: 253984323184
        cfa2: 244951380881
        cfa3: 2750517531
        cfa4: 1909941812
        cfa5: 0
        cfa6: -40198487758
        cfa7: 125980474352
        cfa8: 0
        cfa9: 589378150002
        cfa10: -52240057820
        cfa11: -329364330177
        cfa12: 10950476407
        cfa13: -29044239788
        cfa14: -124095548599
        cfa15: -46142737521
        cfa16: 70000000000
        cfa17: -50900934560
        cfa18: 38540777944
        cfa19: -1698518453380
        cfa20: 0
        cfa21: -1226962062976
        cfa22: 343706433033
        cfa23: -88309009946
        cfa24: 18325718550
        cfa25: 23529713725
        cfa26: -2628227660994
        cfa27: 1418241802000
        cfa28: 0
        cfa29: 7841445629972
        cfa30: -6397797068409
        cfa31: 0
        cfa32: -136131874500
        cfa33: 0
        cfa34: 2725758489063
        cfa35: 136071606013
        cfa36: 509577636533
        cfa37: -174399121
        cfa38: 645474843425
        cfa43: 0
        cfa103: 0
        cfa104: 0
        cfa105: 0
        cfb48: 0
        cfb49: 0
        cfb50: 0
        cfb51: 0
        cfb52: 0
        cfb53: 0
        cfb54: 0
        cfb55: 0
        cfb56: 0
        cfb57: 0
        cfb58: 0
        cfb59: 0
        cfb60: 0
        cfb61: 0
        cfb62: 0
        cfb63: 0
        cfb64: 0
        cfb65: 0
        cfb66: 0
        cfb67: 0
        cfb68: 0
        cfb69: 0
        cfb70: 0
        cfb71: 0
        cfb72: 0
        cfb73: 0
        cfb74: 0
        cfb75: 0
        cfb76: 0
        cfb77: 0
        cfb78: 0
        cfb79: 0
        cfb80: 0
        cfb81: 0
        cfb106: 0
        organCode: "AAA"
        quarterReport: 5
        yearReport: 2018
      }
    }]
    packageId: null
    page: 1
    pageSize: 0
    status: "Success"
    totalCount: 1
  }
}
Download = {
  url: "https://fundamental.fiintrade.vn/FinancialStatement/DownloadCashFlow?language=vi&OrganCode=AAA&Skip=0&Frequency=Yearly",
  response: file
}

//CÔNG CỤ ĐẦU TƯ
//Cảnh báo
Cảnh báo hệ thống = {
  url: "https://tools.fiintrade.vn/PersonalAlert/GetPersonalAlertTypes?language=vi",
  response: {
    errors: null
    items: [
      {
        alertDefinitions: [{code: "CrossUpMa20", groupCode: "Notification.CROSSMA", name: "Cross up MA20"}]
        code: "Notification.CROSSMA"
        description: "Cross MA Line"
        name: "Cross MA Line"
      }
    ]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}
Cảnh báo cá nhân = {
  url: "https://tools.fiintrade.vn/PersonalAlert/GetPersonalSubsribedAlerts?language=vi",
  response: {
    errors: null
    items: []
    packageId: null
    page: 1
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}
Lịch sử cảnh báo = {
  url: "https://tools.fiintrade.vn/Alert/GetNotificationList?language=vi&OrganCode=&Page=1&PageSize=50",
  response: {
    errors: null
    items: [
      {
        alertCode: "Closing"
        alertType: "Technical"
        createDate: "2019-10-10T14:52:11.9"
        message: "[]"
        newsId: null
        notificationId: 78628
        organCode: "VEAM"
        referenceId: "1fd1f481-11cc-481b-b603-2c367f6975fd"
        status: 0
        ticker: "VEA"
        tradingDate: null
      }
    ]
    packageId: null
    page: 1
    pageSize: 50
    status: "Success"
    totalCount: 218
  }
}

//Bộ lọc cổ phiếu
GetScreenItems = {
  url: "https://tools.fiintrade.vn/Screener/GetScreenerItems",
  data: {
    comGroupCode: "All"
    icbCode: "All"
    page: 1
    pageSize: 30
    parameters: []
  },
  response: {
    errors: null
    items: []
    packageId: null
    page: 1
    pageSize: 30
    status: "Success"
    totalCount: 0
  }
}
GetScreenerParameters = {
  url: "https://tools.fiintrade.vn/Screener/GetScreenerParameters?language=vi",
  response: {
    errors: null
    items: [{
      code: "Popular"
      name: "Phổ biến"
      parameters: [{
        code: "ClosePrice"
        name: "Giá"
        selectedValue: [200, 255300]
        type: "Range"
        unit: "ThousandVND"
        valueRange: [200, 255300]
      }]
    }]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}
getTopScreeners = {
  url: "https://core.fiintrade.vn/UserSetting/getTopScreeners?language=vi",
  response: {
    errors: null
    items: [{
      name: "Hạng cao với chiến lược Growth"
      screenerId: 346
      settings: "{"comGroupCode":"All","icbCode":"All","criteria":"FiinTradeIndicators","parameters":[{"name":"FiinTrade Rank","code":"IcbRank","type":"Range","selectedValue":[1,3],"valueRange":[1,355],"unit":"Rank"},{"name":"Growth (FiinTrade Score)","code":"Growth","type":"Value","selectedValue":["A"],"valueRange":["A","B","C","D","F"],"unit":"Unit"}]}"
      userId: 0
    }]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}
GetUserWatchList = {
  url: "https://core.fiintrade.vn/UserSetting/GetUserWatchList?language=vi",
  response: {
    errors: null
    items: [{watchListId: 10, text: "Dầu khí", code: "OIG", typeCode: "Sector"},…]
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 15
  }
}
GetScreeners = {
  url: "https://core.fiintrade.vn/UserSetting/GetScreeners?language=vi",
  response: {
    errors: null
    items: []
    packageId: null
    page: 0
    pageSize: 0
    status: "Success"
    totalCount: 0
  }
}

//Mô hình định giá
GetValuation = {
  url: "https://tools.fiintrade.vn/Valuation/GetValuation?language=vi&OrganCode=AAA",
  response: {
    errors: null
    items: [{
      valuationSector: {
        icbCode: "1350"
        valuationStocks: [{
          marketCap: 2533759644800
          netProfit: 212148913561
          organCode: "AAA"
          pb: 0.8744582628
          pe: 5.7301131128
          revenue: 8011572613389
          ticker: "AAA"
          totalAsset: 7529166722403
        }]
      }
      valuationStock: {
        estimatedBookValue: 20685.8554300199
        estimatedEPS: 3761.09111616278
        forcastBookValue: null
        forecastEPS: null
        organCode: "AAA"
        outstandingShare: 171199976
        recommendMethod: "PE"
        riskFreeRate: 0.0401
        rtd7: 16924.7643138571
        rtd14: 2582.8460466133
        rtd35: 0.7368816207
        rtq180: 526846237009
        vnIndexEquityRisk: 0.0902462
      }
    }]
    packageId: null
    page: 1
    pageSize: 0
    status: "Success"
    totalCount: 1
  }
}

//CHIẾN LƯỢC ĐẦU TƯ
//Xếp hạng cổ phiếu
Xếp hạng = {
  url: "https://strategy.fiintrade.vn/Rankings/GetRanking?language=vi&Page=1&PageSize=50&time=1570703484946&Code=VN30",
  response: {
    errors: null
    items: [{
      analysisCover: "Tốt"
      cashflow: "Tốt"
      comGroupCode: "VNINDEX"
      icbCode: "8355"
      icbName: "Ngân hàng"
      organCode: "VCB"
      organShortName: "Vietcombank"
      profit: "Tốt"
      rankValue: 1
      rankingHistory: [{organCode: "VCB", yearReport: "2019", lengthReport: "2", rankValue: 1},…]
      size: "Tốt"
      ticker: "VCB"
      trading: "Trung bình"
      valuation: "Trung bình"
    }]
    packageId: null
    page: 1
    pageSize: 50
    status: "Success"
    totalCount: 30
  }
}
Đánh giá = {
  url: "https://strategy.fiintrade.vn/Rankings/GetAllScore?language=vi&Page=1&PageSize=50&time=1570703566381&ComGroupCode=",
  response: {
    errors: null
    items: [{
      comGroupCode: "VNINDEX"
      growth: "A"
      icbCode: "8350"
      icbName: "Ngân hàng"
      icbRank: 1
      icbTotalRanked: 18
      momentum: "A"
      organCode: "VCB"
      rtd11: 313400144356000
      ticker: "VCB"
      value: "C"
      vgm: "A"
    }]
    packageId: null
    page: 1
    pageSize: 50
    status: "Success"
    totalCount: 979
  }
}
Download = {
  url: "https://strategy.fiintrade.vn/Rankings/DownloadAllScore?language=vi&Page=1&ComGroupCode=",
  response: file
}

//Chiến lược đầu tư
//Chiến lược Fiintrade
Tổng quan = {
  url: "https://strategy.fiintrade.vn/Strategy/GetOverView?language=vi",
  response: {
    errors: null
    items: [{
      topGrowths: [{
        organCode: "VIC"
        pb: "4.8645014151"
        pe: "80.6899375085"
        roa: "0.0153831431"
        roe: "0.0437115429"
        ticker: "VIC"
      },…]
      topLeaders: [{
        organCode: "VIC"
        pb: "4.8645014151"
        pe: "80.6899375085"
        roa: "0.0153831431"
        roe: "0.0437115429"
        ticker: "VIC"
      },…]
      topMomentums: [{
        organCode: "VCB"
        pb: "4.1063488888"
        pe: "17.8613564772"
        roa: "0.0162089465"
        roe: "0.2515104159"
        ticker: "VCB"
      },…]
      topValues: [{
        organCode: "TCB"
        pb: "1.4716162621"
        pe: "9.3920164855"
        roa: "0.0266887885"
        roe: "0.1665167549"
        ticker: "TCB"
      }]
    }]
    packageId: null
    page: 1
    pageSize: 0
    status: "Success"
    totalCount: 1
  }
}
ĐT giá trị đầu tư = {
  url: "https://strategy.fiintrade.vn/Strategy/GetValueInvestment?language=vi&StrategyScoreType=Value",
  response: {
    errors: null
    items: [{averageStock: -0.2887217435, averageIndex: -0.0626571263, timeRange: 1},…]
    packageId: null
    page: 1
    pageSize: 0
    status: "Success"
    totalCount: 10
  }
}
ĐT giá trị = {
  url: "https://strategy.fiintrade.vn/Strategy/GetValue?language=vi&Page=1&PageSize=50&time=1570703763885",
  response: {
    errors: null
    items: [{
      comGroupCode: "VNINDEX"
      growth: "A"
      icbCode: "8350"
      icbName: "Ngân hàng"
      icbRank: 5
      icbTotalRanked: 18
      momentum: "A"
      organCode: "TCB"
      rtd11: 82694404584000
      ticker: "TCB"
      value: "A"
      vgm: "A"
    },…]
    packageId: null
    page: 1
    pageSize: 50
    status: "Success"
    totalCount: 95
  }
}
ĐT tăng trưởng = {
  url: "https://strategy.fiintrade.vn/Strategy/GetGrowth?language=vi&Page=1&PageSize=50&time=1570703855482",
  response: {
    errors: null
    items: [{
      comGroupCode: "VNINDEX"
      growth: "A"
      icbCode: "8630"
      icbName: "Bất động sản"
      icbRank: 1
      icbTotalRanked: 121
      momentum: "B"
      organCode: "VIC"
      rtd11: 391474440513000
      ticker: "VIC"
      value: "D"
      vgm: "B"
    },…]
    packageId: null
    page: 1
    pageSize: 50
    status: "Success"
    totalCount: 118
  }
}
ĐT động lực = {
  url: "https://strategy.fiintrade.vn/Strategy/GetMomentum?language=vi&Page=1&PageSize=50&time=1570703974792",
  response: {
    errors: null
    items: [{
      comGroupCode: "VNINDEX"
      growth: "A"
      icbCode: "8350"
      icbName: "Ngân hàng"
      icbRank: 1
      icbTotalRanked: 18
      momentum: "A"
      organCode: "VCB"
      rtd11: 313400144356000
      ticker: "VCB"
      value: "C"
      vgm: "A"
    },…]
    packageId: null
    page: 1
    pageSize: 50
    status: "Success"
    totalCount: 140
  }
}
VGM = {
  url: "https://strategy.fiintrade.vn/Strategy/GetVGM?language=vi&Page=1&PageSize=50&time=1570704016834",
  response: {
    errors: null
    items: [{
      comGroupCode: "VNINDEX"
      growth: "A"
      icbCode: "8350"
      icbName: "Ngân hàng"
      icbRank: 1
      icbTotalRanked: 18
      momentum: "A"
      organCode: "VCB"
      rtd11: 313400144356000
      ticker: "VCB"
      value: "C"
      vgm: "A"
    },…]
    packageId: null
    page: 1
    pageSize: 50
    status: "Success"
    totalCount: 175
  }
}
CP dẫn đầu = {
  url: "https://strategy.fiintrade.vn/Strategy/GetLeaders?language=vi&Page=1&PageSize=50&time=1570704063255",
  response: {
    errors: null
    items: [{
      comGroupCode: "VNINDEX"
      growth: "A"
      icbCode: "8630"
      icbName: "Bất động sản"
      icbRank: 1
      icbTotalRanked: 121
      momentum: "B"
      organCode: "VIC"
      rtd11: 391474440513000
      ticker: "VIC"
      value: "D"
      vgm: "B"
    },…]
    packageId: null
    page: 1
    pageSize: 50
    status: "Success"
    totalCount: 105
  }
}
Download = {
  url: "https://strategy.fiintrade.vn/Strategy/DownloadScore?language=vi&StrategyScoreType=Leaders",
  response: file
}