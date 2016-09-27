/**
 * Created by tapes on 16/8/21.
 */
public class HTTPServiceImpl implements HTTPService {

    @Override
    public String get(String url) {
        return "response from: " + url;
    }
}
