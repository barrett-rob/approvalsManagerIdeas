'use strict';

// ria http service unit tests

describe('HttpService tests', function() {

	beforeEach(module('URLService'))
	beforeEach(module('HttpService'))

	describe('login tests', function() {

		var scope, controller, httpBackend, login

		beforeEach(inject(function(_$controller_, _$httpBackend_, $rootScope, _login_) {
			scope = $rootScope.$new()
			controller = _$controller_
			httpBackend = _$httpBackend_
			login = _login_
		}))

		it('login tests...', function() {
			expect(scope).toBeDefined()
			expect(controller).toBeDefined()
			expect(httpBackend).toBeDefined()
			expect(login).toBeDefined()
			// assertions for good login
			httpBackend.whenPOST().respond(CANNED_LOGIN_RESPONSE_0)
			var successCallback = function(response) {
				expect(response.data.connectionId).toBeDefined()
			}
			var response = login({}, successCallback)
			httpBackend.flush()
			// assertions for bad login
		})

	})
})

var CANNED_LOGIN_RESPONSE_0 = '<interaction><actions><action><data><connectionId>a81d9c0f-3ae9-4426-a3ed-58098609d479</connectionId><fullname>MANZIE,ANDREW                 </fullname><position>SYSRPT    </position><scope>R100</scope><userContext><aUSenabled>N</aUSenabled><bODateFormat></bODateFormat><bORequestReportURL></bORequestReportURL><authTypeSecurity>false</authTypeSecurity><bypassWelcome>B</bypassWelcome><calendarDateRange>2020</calendarDateRange><companyName>                 AURORA</companyName><consumptionTax>R</consumptionTax><consumptionTaxAcctRecvOnly>true</consumptionTaxAcctRecvOnly><consumptionTaxEnabled>true</consumptionTaxEnabled><consumptionType>Z1</consumptionType><contractAddTax>N</contractAddTax><correlationId>2FA53D956CC54E0A8B5E1CDC7E0C5423</correlationId><costCentre>CONS</costCentre><costCentreLength>15</costCentreLength><costCentreLevels>4</costCentreLevels><countryCode>AU</countryCode><dateFormat>A</dateFormat><deferTime>010000</deferTime><districtDateFormat>A</districtDateFormat><districtName>             R100 - AUD/USD</districtName><emailAddress>invalid@invalid.com</emailAddress><employeeId>AM2122</employeeId><enabledModules><string>3001</string><string>3040</string><string>3045</string><string>3050</string><string>3055</string><string>3065</string><string>3101</string><string>3110</string><string>3120</string><string>3130</string><string>3140</string><string>3155</string><string>3190</string><string>3201</string><string>3210</string><string>3245</string><string>3250</string><string>3255</string><string>3260</string><string>3280</string><string>3290</string><string>3301</string><string>3340</string><string>3360</string><string>3380</string><string>338A</string><string>3390</string><string>3401</string><string>3430</string><string>3501</string><string>3510</string><string>3515</string><string>3516</string><string>3520</string><string>3530</string><string>3540</string><string>3560</string><string>3580</string><string>3601</string><string>3602</string><string>3605</string><string>3610</string><string>3615</string><string>3620</string><string>3629</string><string>3630</string><string>3635</string><string>3645</string><string>3650</string><string>3655</string><string>3660</string><string>3670</string><string>3680</string><string>3690</string><string>3701</string><string>3715</string><string>3720</string><string>3730</string><string>3760</string><string>3770</string><string>3780</string><string>3785</string><string>3790</string><string>3795</string><string>3801</string><string>381A</string><string>3820</string><string>3840</string><string>3850</string><string>3870</string><string>3875</string><string>3880</string><string>3890</string><string>3895</string><string>3901</string><string>3910</string><string>3920</string><string>3930</string><string>3960</string><string>3965</string><string>3966</string><string>3970</string><string>3980</string><string>3990</string><string>8031</string><string>8095</string><string>8MWP</string><string>AXIS</string></enabledModules><expenseElementLength>5</expenseElementLength><farDistrict>R100</farDistrict><generalLedgerCodeLength>6</generalLedgerCodeLength><globalProfile>SYSRPT</globalProfile><lastRefresh>1412155309017</lastRefresh><lastSupplierNumberAllocated>000059</lastSupplierNumberAllocated><lastUsedEmployee>AM2122</lastUsedEmployee><localCurrency>AUD</localCurrency><loggedOnDistrictCode>R100</loggedOnDistrictCode><loggedOnDistrictName>             R100 - AUD/USD</loggedOnDistrictName><loggedOnRole>SYSRPT    </loggedOnRole><loggedOnRoleName>SYSTEM MANAGER - REPORT UPDATES</loggedOnRoleName><maxLoginAttempts>3</maxLoginAttempts><multiDistrict>Y</multiDistrict><numberOfPeriods>12</numberOfPeriods><offsiteReceiptIndicator>Y</offsiteReceiptIndicator><originTariff>N</originTariff><printerCode>70</printerCode><printerId>PRTBNE6E</printerId><printerName>PRTBNE6E</printerName><pwdUnchangedDays>000</pwdUnchangedDays><receiptDefaultReceivedBy></receiptDefaultReceivedBy><receiptReceivedByProtected>N</receiptReceivedByProtected><salesTax>N</salesTax><salesTaxEnabled>false</salesTaxEnabled><scaEmployeeFlag>B</scaEmployeeFlag><secondaryCurrency>USD</secondaryCurrency><securityToken><auxiliaryProperties><correlationId>2FA53D956CC54E0A8B5E1CDC7E0C5423</correlationId><legacyTrace>false</legacyTrace><traceLevel>0</traceLevel></auxiliaryProperties><connectionId><id>bc558f43-cdd4-494d-8184-ac2b48c3419e</id></connectionId><district>R100</district><role>SYSRPT    </role><userId>AM2122</userId></securityToken><stdTextCompressed>R</stdTextCompressed><supplierNumberRightJustifyZeroFill>Y</supplierNumberRightJustifyZeroFill><systemAdministrator>true</systemAdministrator><systemType>PRODUCTION</systemType><testDate>00000000</testDate><testIndicator>P</testIndicator><userAllowedToAccessSuspendedDistricts>false</userAllowedToAccessSuspendedDistricts><userId>AM2122</userId><userProfile>0909909099000000000900000000000000000099000000000900000000000000000007000000000000000000000000000000000000000000000000090000000000000000000900000000090000900000000000000990005000099000909009000000000990000000000000000000000000000000000000000000000009</userProfile><version>8</version><warehouseServiceTime>3</warehouseServiceTime><workFacsimileNumber></workFacsimileNumber></userContext><username>AM2122</username></data><id>D409C15F-95E8-2B39-8858-C9A59F43EDD4</id><messages /><name>login</name></action></actions><application>login</application><applicationPage>none</applicationPage><transaction>false</transaction></interaction>'
