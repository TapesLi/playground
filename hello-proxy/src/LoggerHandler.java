import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

/**
 * Created by tapes on 16/8/21.
 */
public class LoggerHandler implements InvocationHandler {

    private Object object;

    public LoggerHandler(Object object) {
        this.object = object;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

        String response;

        before();

        response = (String)method.invoke(object, args);

        after();


        return response;
    }

    private void before() {
        System.out.println("before");
    }

    private void after() {
        System.out.println("after");

    }
}
