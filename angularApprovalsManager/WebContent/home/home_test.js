'use strict';

describe('approvalsManager.home module', function() {

	beforeEach(module('approvalsManager.home'));

	describe('home controller', function(){

		var scope, ctrlr, timeout, httpBackend
		beforeEach(inject(function($controller, $rootScope, $timeout, $httpBackend) {
			scope = $rootScope.$new()
			ctrlr = $controller('homeController', { $scope: scope })
			timeout = $timeout
			httpBackend = $httpBackend
		}))

		it('init', inject(function($controller, $rootScope, $timeout, $httpBackend) {
			expect(scope).toBeDefined()
			expect(ctrlr).toBeDefined()
			expect(timeout).toBeDefined()
			expect(httpBackend).toBeDefined()
			// check the scope
			expect(scope.alerts).toBeDefined()
			expect(scope.refresh).toBeDefined()
			expect(scope.itemTypeCounts).toBeUndefined()
			// login
			httpBackend.expectPOST().respond(SUCCESFUL_LOGIN_RESPONSE)
			timeout.flush()
			httpBackend.flush()
			// test that a request was made
			httpBackend.expectPOST().respond(ITEM_COUNTS_RESPONSE)
			timeout.flush()
			httpBackend.flush()
			expect(scope.itemTypeCounts).toBeDefined()
			expect(scope.itemTypeCounts['VA'].count).toEqual(2)
			expect(scope.itemTypeCounts['VA'].itemDescription).toBeDefined()
		}))

  })
})

var SUCCESFUL_LOGIN_RESPONSE = '<interaction><actions><action><data><connectionId>NOMINAL_CONNECTION_ID</connectionId><fullname>MANZIE,ANDREW                 </fullname><position>SYSRPT    </position><scope>R100</scope><userContext><aUSenabled>N</aUSenabled><bODateFormat></bODateFormat><bORequestReportURL></bORequestReportURL><authTypeSecurity>false</authTypeSecurity><bypassWelcome>B</bypassWelcome><calendarDateRange>2020</calendarDateRange><companyName>                 AURORA</companyName><consumptionTax>R</consumptionTax><consumptionTaxAcctRecvOnly>true</consumptionTaxAcctRecvOnly><consumptionTaxEnabled>true</consumptionTaxEnabled><consumptionType>Z1</consumptionType><contractAddTax>N</contractAddTax><correlationId>2FA53D956CC54E0A8B5E1CDC7E0C5423</correlationId><costCentre>CONS</costCentre><costCentreLength>15</costCentreLength><costCentreLevels>4</costCentreLevels><countryCode>AU</countryCode><dateFormat>A</dateFormat><deferTime>010000</deferTime><districtDateFormat>A</districtDateFormat><districtName>             R100 - AUD/USD</districtName><emailAddress>invalid@invalid.com</emailAddress><employeeId>AM2122</employeeId><enabledModules><string>3001</string><string>3040</string><string>3045</string><string>3050</string><string>3055</string><string>3065</string><string>3101</string><string>3110</string><string>3120</string><string>3130</string><string>3140</string><string>3155</string><string>3190</string><string>3201</string><string>3210</string><string>3245</string><string>3250</string><string>3255</string><string>3260</string><string>3280</string><string>3290</string><string>3301</string><string>3340</string><string>3360</string><string>3380</string><string>338A</string><string>3390</string><string>3401</string><string>3430</string><string>3501</string><string>3510</string><string>3515</string><string>3516</string><string>3520</string><string>3530</string><string>3540</string><string>3560</string><string>3580</string><string>3601</string><string>3602</string><string>3605</string><string>3610</string><string>3615</string><string>3620</string><string>3629</string><string>3630</string><string>3635</string><string>3645</string><string>3650</string><string>3655</string><string>3660</string><string>3670</string><string>3680</string><string>3690</string><string>3701</string><string>3715</string><string>3720</string><string>3730</string><string>3760</string><string>3770</string><string>3780</string><string>3785</string><string>3790</string><string>3795</string><string>3801</string><string>381A</string><string>3820</string><string>3840</string><string>3850</string><string>3870</string><string>3875</string><string>3880</string><string>3890</string><string>3895</string><string>3901</string><string>3910</string><string>3920</string><string>3930</string><string>3960</string><string>3965</string><string>3966</string><string>3970</string><string>3980</string><string>3990</string><string>8031</string><string>8095</string><string>8MWP</string><string>AXIS</string></enabledModules><expenseElementLength>5</expenseElementLength><farDistrict>R100</farDistrict><generalLedgerCodeLength>6</generalLedgerCodeLength><globalProfile>SYSRPT</globalProfile><lastRefresh>1412155309017</lastRefresh><lastSupplierNumberAllocated>000059</lastSupplierNumberAllocated><lastUsedEmployee>AM2122</lastUsedEmployee><localCurrency>AUD</localCurrency><loggedOnDistrictCode>R100</loggedOnDistrictCode><loggedOnDistrictName>             R100 - AUD/USD</loggedOnDistrictName><loggedOnRole>SYSRPT    </loggedOnRole><loggedOnRoleName>SYSTEM MANAGER - REPORT UPDATES</loggedOnRoleName><maxLoginAttempts>3</maxLoginAttempts><multiDistrict>Y</multiDistrict><numberOfPeriods>12</numberOfPeriods><offsiteReceiptIndicator>Y</offsiteReceiptIndicator><originTariff>N</originTariff><printerCode>70</printerCode><printerId>PRTBNE6E</printerId><printerName>PRTBNE6E</printerName><pwdUnchangedDays>000</pwdUnchangedDays><receiptDefaultReceivedBy></receiptDefaultReceivedBy><receiptReceivedByProtected>N</receiptReceivedByProtected><salesTax>N</salesTax><salesTaxEnabled>false</salesTaxEnabled><scaEmployeeFlag>B</scaEmployeeFlag><secondaryCurrency>USD</secondaryCurrency><securityToken><auxiliaryProperties><correlationId>2FA53D956CC54E0A8B5E1CDC7E0C5423</correlationId><legacyTrace>false</legacyTrace><traceLevel>0</traceLevel></auxiliaryProperties><connectionId><id>bc558f43-cdd4-494d-8184-ac2b48c3419e</id></connectionId><district>R100</district><role>SYSRPT    </role><userId>AM2122</userId></securityToken><stdTextCompressed>R</stdTextCompressed><supplierNumberRightJustifyZeroFill>Y</supplierNumberRightJustifyZeroFill><systemAdministrator>true</systemAdministrator><systemType>PRODUCTION</systemType><testDate>00000000</testDate><testIndicator>P</testIndicator><userAllowedToAccessSuspendedDistricts>false</userAllowedToAccessSuspendedDistricts><userId>AM2122</userId><userProfile>0909909099000000000900000000000000000099000000000900000000000000000007000000000000000000000000000000000000000000000000090000000000000000000900000000090000900000000000000990005000099000909009000000000990000000000000000000000000000000000000000000000009</userProfile><version>8</version><warehouseServiceTime>3</warehouseServiceTime><workFacsimileNumber></workFacsimileNumber></userContext><username>AM2122</username></data><id>D409C15F-95E8-2B39-8858-C9A59F43EDD4</id><messages /><name>login</name></action></actions><application>login</application><applicationPage>none</applicationPage><transaction>false</transaction></interaction>'

var ITEM_COUNTS_RESPONSE = '<interaction><actions><action><data><maxInstances>20</maxInstances><name>com.mincom.ellipse.service.m3875.approvalsmanager.ApprovalsManagerService</name><operation>retrieveApprovals</operation><result><dto><allocpc>0.0</allocpc><amountToAuthorise>10.0</amountToAuthorise><approvalFlowSw>Y</approvalFlowSw><assignedToPositionId>SYSAD</assignedToPositionId><authsdStatus>U</authsdStatus><certifyFlowSw>N</certifyFlowSw><confirmFlowSw>N</confirmFlowSw><costing></costing><createdBy>A9AW1836</createdBy><createdByDesc>WIDIYA, ANDRI</createdByDesc><currencyType>AUD</currencyType><dateCreated>20140226</dateCreated><deferFlowSw>Y</deferFlowSw><description>TEST</description><diaryEntriesExist>false</diaryEntriesExist><displayKey>R100/000001/DTINV001            /001    </displayKey><dstrctCode>R100</dstrctCode><employeeId>AM2122</employeeId><endorseFlowSw>N</endorseFlowSw><extInvNo>DTINV001</extInvNo><multipleAccounts>false</multipleAccounts><nomAuthsdBy>A9AW1836</nomAuthsdBy><numberOfItems>0000</numberOfItems><origPosnId>SYSAD</origPosnId><positionId>SYSAD</positionId><priorityCode></priorityCode><reasonCode>09</reasonCode><reasonDesc>Refer for Approval</reasonDesc><redirectFlowSw>Y</redirectFlowSw><rejectFlowSw>Y</rejectFlowSw><stepAppCode>01</stepAppCode><supplierNo>000001</supplierNo><tran877Type>NI</tran877Type><transactionKey>R100000001DTINV001  001</transactionKey><transactionStatus>U</transactionStatus><uuid>E8C1F520B038454298D4C3AC7D67ABCC</uuid></dto><dto><allocpc>0.0</allocpc><amountToAuthorise>10.0</amountToAuthorise><approvalFlowSw>Y</approvalFlowSw><assignedToPositionId>SYSAD</assignedToPositionId><authsdStatus>U</authsdStatus><certifyFlowSw>N</certifyFlowSw><confirmFlowSw>N</confirmFlowSw><costing></costing><createdBy>A9AW1836</createdBy><createdByDesc>WIDIYA, ANDRI</createdByDesc><currencyType>AUD</currencyType><dateCreated>20140226</dateCreated><deferFlowSw>Y</deferFlowSw><description>1</description><diaryEntriesExist>false</diaryEntriesExist><displayKey>R100/000001/DTINV003            /001    </displayKey><dstrctCode>R100</dstrctCode><employeeId>AM2122</employeeId><endorseFlowSw>N</endorseFlowSw><extInvNo>DTINV003</extInvNo><multipleAccounts>false</multipleAccounts><nomAuthsdBy>A9AW1836</nomAuthsdBy><numberOfItems>0000</numberOfItems><origPosnId>SYSAD</origPosnId><positionId>SYSAD</positionId><priorityCode></priorityCode><reasonCode>09</reasonCode><reasonDesc>Refer for Approval</reasonDesc><redirectFlowSw>Y</redirectFlowSw><rejectFlowSw>Y</rejectFlowSw><stepAppCode>01</stepAppCode><supplierNo>000001</supplierNo><tran877Type>NI</tran877Type><transactionKey>R100000001DTINV003  001</transactionKey><transactionStatus>U</transactionStatus><uuid>0567B155841E44CB96A5DB8530B21782</uuid></dto><dto><allocpc>0.0</allocpc><amountToAuthorise>450.0</amountToAuthorise><approvalFlowSw>Y</approvalFlowSw><assignedToPositionId>SYSAD</assignedToPositionId><authsdStatus>U</authsdStatus><certifyFlowSw>N</certifyFlowSw><confirmFlowSw>N</confirmFlowSw><costing></costing><createdBy>TD6444</createdBy><createdByDesc>DAY, TIM</createdByDesc><currencyType>AUD</currencyType><dateCreated>20130802</dateCreated><deferFlowSw>N</deferFlowSw><description>AUTHORISE CONTRACT VALUATION</description><diaryEntriesExist>false</diaryEntriesExist><displayKey>                                        </displayKey><dstrctCode>R120</dstrctCode><employeeId>AM2122</employeeId><endorseFlowSw>N</endorseFlowSw><multipleAccounts>false</multipleAccounts><nomAuthsdBy>TD6444</nomAuthsdBy><numberOfItems>0000</numberOfItems><origPosnId>SYSAD</origPosnId><positionId>SYSAD</positionId><priorityCode></priorityCode><reasonCode>09</reasonCode><reasonDesc>Refer for Approval</reasonDesc><redirectFlowSw>Y</redirectFlowSw><rejectFlowSw>Y</rejectFlowSw><stepAppCode>01</stepAppCode><supplierNo>000006</supplierNo><tran877Type>VA</tran877Type><transactionKey>TD11    0002</transactionKey><transactionStatus>U</transactionStatus><uuid>04923273BD324CE0A6A4E019B91B1906</uuid></dto><dto><allocpc>0.0</allocpc><amountToAuthorise>9,000.0</amountToAuthorise><approvalFlowSw>Y</approvalFlowSw><assignedToPositionId>SYSAD</assignedToPositionId><authsdStatus>U</authsdStatus><certifyFlowSw>N</certifyFlowSw><confirmFlowSw>N</confirmFlowSw><costing></costing><createdBy>AF6336</createdBy><createdByDesc>FEDRICK, ANN</createdByDesc><currencyType>AUD</currencyType><dateCreated>20131008</dateCreated><deferFlowSw>N</deferFlowSw><description>AUTHORISE CONTRACT VALUATION</description><diaryEntriesExist>false</diaryEntriesExist><displayKey>                                        </displayKey><dstrctCode>R200</dstrctCode><employeeId>AM2122</employeeId><endorseFlowSw>N</endorseFlowSw><multipleAccounts>false</multipleAccounts><nomAuthsdBy>KK3079</nomAuthsdBy><numberOfItems>0000</numberOfItems><origPosnId>SYSAD</origPosnId><positionId>SYSAD</positionId><priorityCode></priorityCode><reasonCode>09</reasonCode><reasonDesc>Refer for Approval</reasonDesc><redirectFlowSw>Y</redirectFlowSw><rejectFlowSw>Y</rejectFlowSw><stepAppCode>01</stepAppCode><supplierNo>TRANS</supplierNo><tran877Type>VA</tran877Type><transactionKey>D-08697 0002</transactionKey><transactionStatus>U</transactionStatus><uuid>B13BD881B73F4C4FB13C38440AE290C9</uuid></dto></result><returnWarnings>true</returnWarnings></data><id>0B942C70-272A-1DFB-4865-3F2004C2F550</id><messages /><name>service</name></action></actions><application>mseapm</application><applicationPage>search</applicationPage><connectionId>b91a01ab-330c-49d8-aa6a-3eb8e74574ca</connectionId><transaction>false</transaction></interaction>'
