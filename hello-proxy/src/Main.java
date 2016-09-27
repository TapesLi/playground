import java.lang.reflect.Proxy;

public class Main {

    public static void main(String[] args) {
        HTTPService httpService = new HTTPServiceImpl();
        LoggerHandler loggerHandler = new LoggerHandler(httpService);

        HTTPService httpServiceProxy = (HTTPService) Proxy.newProxyInstance(
                HTTPService.class.getClassLoader(),
                new Class[]{HTTPService.class},
                loggerHandler
        );

        String response = httpServiceProxy.get("http://www.baidu.com");

        System.out.println(response);
    }
}
