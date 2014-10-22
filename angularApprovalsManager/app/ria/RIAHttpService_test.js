'use strict';

// ria http service unit tests

describe('RIAHttpService tests', function() {

	beforeEach(module('RIASettingsService'))
	beforeEach(module('RIAHttpService'))

	describe('poke tests', function() {

		var poke, setSettings, httpBackend
		beforeEach(inject(function(_poke_, _setSettings_, _$httpBackend_) {
			poke = _poke_
			setSettings = _setSettings_
			httpBackend = _$httpBackend_
		}))

		it('poke tests...', function() {
			expect(poke).toBeDefined()
			expect(setSettings).toBeDefined()
			expect(httpBackend).toBeDefined()
			httpBackend.whenGET('http://example.com').respond(200, '') // ok
			httpBackend.whenGET('http://bogus.com').respond(404, '') // not found
			poke('http://example.com', function(success) {
				expect(success).toBeTruthy()
			})
			httpBackend.flush()
			poke('http://bogus.com', function(success) {
				expect(success).toBeFalsy()
			})
			httpBackend.flush()
		})

	})

	describe('login tests', function() {

		var scope, controller, httpBackend, login

		beforeEach(inject(function(_$controller_, _$httpBackend_, $rootScope, _login_) {
			scope = $rootScope.$new()
			controller = _$controller_
			httpBackend = _$httpBackend_
			login = _login_
		}))

		it('successful login test', function() {
			expect(scope).toBeDefined()
			expect(controller).toBeDefined()
			expect(httpBackend).toBeDefined()
			expect(login).toBeDefined()
			// assertions for good login
			httpBackend.whenPOST().respond(SUCCESFUL_LOGIN_RESPONSE)
			var successCallback = function(response) {
				expect(response.data.connectionId).toBeDefined()
			}
			var response = login(successCallback)
			httpBackend.flush()
		})

		it('failed login test', function() {
			expect(scope).toBeDefined()
			expect(controller).toBeDefined()
			expect(httpBackend).toBeDefined()
			expect(login).toBeDefined()
			// assertions for bad login
			httpBackend.whenPOST().respond(FAILED_LOGIN_RESPONSE)
			var failedCallback = function(response) {
				expect(response.messages.errors).toBeDefined()
				expect(response.messages.errors.message).toBeDefined()
				expect(response.messages.errors.message.text).toEqual('USER PROFILE NOT FOUND')
				expect(response.messages.errors.message.field).toEqual('username')
			}
			var response = login(failedCallback)
			httpBackend.flush()
		})

	})
})

var SUCCESFUL_LOGIN_RESPONSE = '<interaction><actions><action><data><connectionId>a81d9c0f-3ae9-4426-a3ed-58098609d479</connectionId><fullname>MANZIE,ANDREW                 </fullname><position>SYSRPT    </position><scope>R100</scope><userContext><aUSenabled>N</aUSenabled><bODateFormat></bODateFormat><bORequestReportURL></bORequestReportURL><authTypeSecurity>false</authTypeSecurity><bypassWelcome>B</bypassWelcome><calendarDateRange>2020</calendarDateRange><companyName>                 AURORA</companyName><consumptionTax>R</consumptionTax><consumptionTaxAcctRecvOnly>true</consumptionTaxAcctRecvOnly><consumptionTaxEnabled>true</consumptionTaxEnabled><consumptionType>Z1</consumptionType><contractAddTax>N</contractAddTax><correlationId>2FA53D956CC54E0A8B5E1CDC7E0C5423</correlationId><costCentre>CONS</costCentre><costCentreLength>15</costCentreLength><costCentreLevels>4</costCentreLevels><countryCode>AU</countryCode><dateFormat>A</dateFormat><deferTime>010000</deferTime><districtDateFormat>A</districtDateFormat><districtName>             R100 - AUD/USD</districtName><emailAddress>invalid@invalid.com</emailAddress><employeeId>AM2122</employeeId><enabledModules><string>3001</string><string>3040</string><string>3045</string><string>3050</string><string>3055</string><string>3065</string><string>3101</string><string>3110</string><string>3120</string><string>3130</string><string>3140</string><string>3155</string><string>3190</string><string>3201</string><string>3210</string><string>3245</string><string>3250</string><string>3255</string><string>3260</string><string>3280</string><string>3290</string><string>3301</string><string>3340</string><string>3360</string><string>3380</string><string>338A</string><string>3390</string><string>3401</string><string>3430</string><string>3501</string><string>3510</string><string>3515</string><string>3516</string><string>3520</string><string>3530</string><string>3540</string><string>3560</string><string>3580</string><string>3601</string><string>3602</string><string>3605</string><string>3610</string><string>3615</string><string>3620</string><string>3629</string><string>3630</string><string>3635</string><string>3645</string><string>3650</string><string>3655</string><string>3660</string><string>3670</string><string>3680</string><string>3690</string><string>3701</string><string>3715</string><string>3720</string><string>3730</string><string>3760</string><string>3770</string><string>3780</string><string>3785</string><string>3790</string><string>3795</string><string>3801</string><string>381A</string><string>3820</string><string>3840</string><string>3850</string><string>3870</string><string>3875</string><string>3880</string><string>3890</string><string>3895</string><string>3901</string><string>3910</string><string>3920</string><string>3930</string><string>3960</string><string>3965</string><string>3966</string><string>3970</string><string>3980</string><string>3990</string><string>8031</string><string>8095</string><string>8MWP</string><string>AXIS</string></enabledModules><expenseElementLength>5</expenseElementLength><farDistrict>R100</farDistrict><generalLedgerCodeLength>6</generalLedgerCodeLength><globalProfile>SYSRPT</globalProfile><lastRefresh>1412155309017</lastRefresh><lastSupplierNumberAllocated>000059</lastSupplierNumberAllocated><lastUsedEmployee>AM2122</lastUsedEmployee><localCurrency>AUD</localCurrency><loggedOnDistrictCode>R100</loggedOnDistrictCode><loggedOnDistrictName>             R100 - AUD/USD</loggedOnDistrictName><loggedOnRole>SYSRPT    </loggedOnRole><loggedOnRoleName>SYSTEM MANAGER - REPORT UPDATES</loggedOnRoleName><maxLoginAttempts>3</maxLoginAttempts><multiDistrict>Y</multiDistrict><numberOfPeriods>12</numberOfPeriods><offsiteReceiptIndicator>Y</offsiteReceiptIndicator><originTariff>N</originTariff><printerCode>70</printerCode><printerId>PRTBNE6E</printerId><printerName>PRTBNE6E</printerName><pwdUnchangedDays>000</pwdUnchangedDays><receiptDefaultReceivedBy></receiptDefaultReceivedBy><receiptReceivedByProtected>N</receiptReceivedByProtected><salesTax>N</salesTax><salesTaxEnabled>false</salesTaxEnabled><scaEmployeeFlag>B</scaEmployeeFlag><secondaryCurrency>USD</secondaryCurrency><securityToken><auxiliaryProperties><correlationId>2FA53D956CC54E0A8B5E1CDC7E0C5423</correlationId><legacyTrace>false</legacyTrace><traceLevel>0</traceLevel></auxiliaryProperties><connectionId><id>bc558f43-cdd4-494d-8184-ac2b48c3419e</id></connectionId><district>R100</district><role>SYSRPT    </role><userId>AM2122</userId></securityToken><stdTextCompressed>R</stdTextCompressed><supplierNumberRightJustifyZeroFill>Y</supplierNumberRightJustifyZeroFill><systemAdministrator>true</systemAdministrator><systemType>PRODUCTION</systemType><testDate>00000000</testDate><testIndicator>P</testIndicator><userAllowedToAccessSuspendedDistricts>false</userAllowedToAccessSuspendedDistricts><userId>AM2122</userId><userProfile>0909909099000000000900000000000000000099000000000900000000000000000007000000000000000000000000000000000000000000000000090000000000000000000900000000090000900000000000000990005000099000909009000000000990000000000000000000000000000000000000000000000009</userProfile><version>8</version><warehouseServiceTime>3</warehouseServiceTime><workFacsimileNumber></workFacsimileNumber></userContext><username>AM2122</username></data><id>D409C15F-95E8-2B39-8858-C9A59F43EDD4</id><messages /><name>login</name></action></actions><application>login</application><applicationPage>none</applicationPage><transaction>false</transaction></interaction>'

var FAILED_LOGIN_RESPONSE = [ "<interaction><actions><action><id>17797B6D-B5CF-7241-E58A-CE58BACA104B</id><messages><errors><message><field>username</field><index>-1</index><stacktrace>com.ventyx.authentication.exception.AuthenticationErrorException: USER PROFILE NOT FOUND",
			"at com.ventyx.ellipse.authentication.service.EllipseAuthenticationServiceImpl.doConnect(EllipseAuthenticationServiceImpl.java:97)",
			"at com.ventyx.ellipse.authentication.service.EllipseAuthenticationServiceImpl._connect(EllipseAuthenticationServiceImpl.java:78)",
			"at com.ventyx.ellipse.authentication.service.EllipseAuthenticationServiceImpl.connect(EllipseAuthenticationServiceImpl.java:37)",
			"at com.ventyx.ellipse.authentication.provider.EllipseAuthenticationProvider.authenticate(EllipseAuthenticationProvider.java:21)",
			"at com.ventyx.authentication.service.AuthenticationServiceImpl.authenticate(AuthenticationServiceImpl.java:30)",
			"at com.mincom.ria.service.impl.LoginServiceImpl.authenticate(LoginServiceImpl.java:131)",
			"at com.mincom.ria.service.impl.LoginServiceImpl.login(LoginServiceImpl.java:46)",
			"at com.mincom.ria.service.impl.LoginServiceAfterAuthentication.login(LoginServiceAfterAuthentication.java:41)",
			"at com.mincom.ria.action.impl.LoginAction.execute(LoginAction.java:57)",
			"at com.mincom.ria.action.BeanAction.executeAction(BeanAction.java:29)",
			"at sun.reflect.GeneratedMethodAccessor796.invoke(Unknown Source)",
			"at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)",
			"at java.lang.reflect.Method.invoke(Method.java:622)",
			"at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:317)",
			"at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:183)",
			"at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:150)",
			"at org.springframework.aop.interceptor.ExposeInvocationInterceptor.invoke(ExposeInvocationInterceptor.java:91)",
			"at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:172)",
			"at org.springframework.aop.framework.JdkDynamicAopProxy.invoke(JdkDynamicAopProxy.java:204)",
			"at com.sun.proxy.$Proxy117.executeAction(Unknown Source)",
			"at com.mincom.ria.service.impl.InteractionServiceImpl$3.execute(InteractionServiceImpl.java:308)",
			"at com.mincom.ria.service.impl.InteractionServiceImpl$3.execute(InteractionServiceImpl.java:300)",
			"at com.mincom.monitor.MonitorTemplate.timeExecution(MonitorTemplate.java:54)",
			"at com.mincom.monitor.MonitorTemplate.timeExecution(MonitorTemplate.java:13)",
			"at com.mincom.ria.service.impl.InteractionServiceImpl.execute(InteractionServiceImpl.java:300)",
			"at com.mincom.ria.service.impl.InteractionServiceImpl$2.execute(InteractionServiceImpl.java:209)",
			"at com.mincom.ria.interaction.ActionInvokerImpl.invoke(ActionInvokerImpl.java:18)",
			"at com.mincom.ria.service.impl.InteractionServiceImpl._execute(InteractionServiceImpl.java:222)",
			"at com.mincom.ria.service.impl.InteractionServiceImpl.access$000(InteractionServiceImpl.java:53)",
			"at com.mincom.ria.service.impl.InteractionServiceImpl$1.execute(InteractionServiceImpl.java:188)",
			"at com.mincom.ria.service.impl.InteractionServiceImpl$1.execute(InteractionServiceImpl.java:185)",
			"at com.mincom.monitor.MonitorTemplate.timeExecution(MonitorTemplate.java:54)",
			"at com.mincom.monitor.MonitorTemplate.timeExecution(MonitorTemplate.java:13)",
			"at com.mincom.ria.service.impl.InteractionServiceImpl.execute(InteractionServiceImpl.java:185)",
			"at sun.reflect.GeneratedMethodAccessor815.invoke(Unknown Source)",
			"at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)",
			"at java.lang.reflect.Method.invoke(Method.java:622)",
			"at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:317)",
			"at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:183)",
			"at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:150)",
			"at com.mincom.ria.interaction.InteractionAdvice$MethodChain.proceed(InteractionAdvice.java:53)",
			"at com.mincom.ria.interaction.SecurityTokenInterceptor$1.callT(SecurityTokenInterceptor.java:25)",
			"at com.mincom.ria.interaction.SecurityTokenInterceptor.invoke(SecurityTokenInterceptor.java:33)",
			"at com.mincom.ria.interaction.InteractionAdvice$MethodChain.proceed(InteractionAdvice.java:56)",
			"at com.mincom.ria.interaction.ApplicationInterceptor.invoke(ApplicationInterceptor.java:19)",
			"at com.mincom.ria.interaction.InteractionAdvice$MethodChain.proceed(InteractionAdvice.java:56)",
			"at com.mincom.ria.transaction.InteractionTransaction.invoke(InteractionTransaction.java:23)",
			"at com.mincom.ria.interaction.InteractionAdvice$MethodChain.proceed(InteractionAdvice.java:56)",
			"at com.mincom.ria.interaction.ValidConnectionInterceptor.invoke(ValidConnectionInterceptor.java:19)",
			"at com.mincom.ria.interaction.InteractionAdvice$MethodChain.proceed(InteractionAdvice.java:56)",
			"at com.mincom.ria.service.impl.EllipseConnectionIdServiceImpl$1.callT(EllipseConnectionIdServiceImpl.java:52)",
			"at com.mincom.ellipse.service.util.ThreadLocalSafe.setT(ThreadLocalSafe.java:21)",
			"at com.mincom.ellipse.service.util.ThreadLocalSafe.access$000(ThreadLocalSafe.java:3)",
			"at com.mincom.ellipse.service.util.ThreadLocalSafe$1.callT(ThreadLocalSafe.java:35)",
			"at com.mincom.ellipse.service.util.ThreadLocalSafe.setT(ThreadLocalSafe.java:21)",
			"at com.mincom.ellipse.service.util.ThreadLocalSafe.access$000(ThreadLocalSafe.java:3)",
			"at com.mincom.ellipse.service.util.ThreadLocalSafe$1.callT(ThreadLocalSafe.java:35)",
			"at com.mincom.ellipse.service.util.Callback.callT(Callback.java:19)",
			"at com.mincom.ria.service.impl.EllipseConnectionIdServiceImpl$3.callT(EllipseConnectionIdServiceImpl.java:78)",
			"at com.mincom.ria.service.impl.EllipseConnectionIdServiceImpl.invoke(EllipseConnectionIdServiceImpl.java:49)",
			"at com.mincom.ria.interaction.InteractionAdvice$MethodChain.proceed(InteractionAdvice.java:56)",
			"at com.mincom.ria.service.impl.ConnectionServiceImpl$1.callT(ConnectionServiceImpl.java:24)",
			"at com.mincom.ellipse.service.util.ThreadLocalSafe.setT(ThreadLocalSafe.java:21)",
			"at com.mincom.ellipse.service.util.ThreadLocalSafe.access$000(ThreadLocalSafe.java:3)",
			"at com.mincom.ellipse.service.util.ThreadLocalSafe$1.callT(ThreadLocalSafe.java:35)",
			"at com.mincom.ria.service.impl.ConnectionServiceImpl.invoke(ConnectionServiceImpl.java:21)",
			"at com.mincom.ria.interaction.InteractionAdvice$MethodChain.proceed(InteractionAdvice.java:56)",
			"at com.mincom.ria.interaction.InteractionAdvice.invoke(InteractionAdvice.java:36)",
			"at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:172)",
			"at org.springframework.aop.framework.adapter.MethodBeforeAdviceInterceptor.invoke(MethodBeforeAdviceInterceptor.java:51)",
			"at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:172)",
			"at org.springframework.aop.interceptor.ExposeInvocationInterceptor.invoke(ExposeInvocationInterceptor.java:91)",
			"at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:172)",
			"at org.springframework.aop.framework.JdkDynamicAopProxy.invoke(JdkDynamicAopProxy.java:204)",
			"at com.sun.proxy.$Proxy150.execute(Unknown Source)",
			"at com.mincom.ria.servlet.InteractionServlet._service(InteractionServlet.java:78)",
			"at com.mincom.ria.servlet.InteractionServlet.handleRequest(InteractionServlet.java:69)",
			"at org.springframework.web.context.support.HttpRequestHandlerServlet.service(HttpRequestHandlerServlet.java:68)",
			"at javax.servlet.http.HttpServlet.service(HttpServlet.java:847)",
			"at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:329)",
			"at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:248)",
			"at com.mincom.ria.filter.ProfileFilter.doFilterInternal(ProfileFilter.java:32)",
			"at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)",
			"at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:343)",
			"at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:260)",
			"at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:280)",
			"at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:248)",
			"at com.mincom.ria.filter.ClientLocationFilter.doFilterInternal(ClientLocationFilter.java:23)",
			"at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)",
			"at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:343)",
			"at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:260)",
			"at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:280)",
			"at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:248)",
			"at com.mincom.ria.filter.WiaFilter.doFilterInternal(WiaFilter.java:165)",
			"at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)",
			"at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:343)",
			"at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:260)",
			"at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:280)",
			"at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:248)",
			"at com.mincom.ria.filter.LoggingFilter.doFilterInternal(LoggingFilter.java:34)",
			"at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)",
			"at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:343)",
			"at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:260)",
			"at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:280)",
			"at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:248)",
			"at com.mincom.ria.filter.EllipseLogoutHandler$1.runE(EllipseLogoutHandler.java:21)",
			"at com.mincom.ria.filter.EllipseLogoutHandler.handle(EllipseLogoutHandler.java:26)",
			"at com.mincom.ria.filter.LogoutFilter.doFilterInternal(LogoutFilter.java:32)",
			"at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)",
			"at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:343)",
			"at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:260)",
			"at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:280)",
			"at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:248)",
			"at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:99)",
			"at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)",
			"at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:280)",
			"at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:248)",
			"at com.mincom.ria.filter.OpenAMFilter.doFilterInternal(OpenAMFilter.java:98)",
			"at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)",
			"at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:343)",
			"at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:260)",
			"at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:280)",
			"at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:248)",
			"at com.mincom.ria.filter.LateInitialisingFilter.doFilterInternal(LateInitialisingFilter.java:98)",
			"at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)",
			"at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:343)",
			"at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:260)",
			"at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:280)",
			"at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:248)",
			"at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:275)",
			"at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:161)",
			"at org.jboss.as.web.security.SecurityContextAssociationValve.invoke(SecurityContextAssociationValve.java:153)",
			"at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:155)",
			"at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:102)",
			"at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:109)",
			"at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:368)",
			"at org.apache.coyote.http11.Http11Processor.process(Http11Processor.java:877)",
			"at org.apache.coyote.http11.Http11Protocol$Http11ConnectionHandler.process(Http11Protocol.java:671)",
			"at org.apache.tomcat.util.net.JIoEndpoint$Worker.run(JIoEndpoint.java:930)",
			"at java.lang.Thread.run(Thread.java:701)",
			"</stacktrace><text>USER PROFILE NOT FOUND</text></message></errors></messages><name>login</name></action></actions><application>login</application><applicationPage>none</applicationPage><transaction>false</transaction></interaction>" ]
		.join('\n')



