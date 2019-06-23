import java.util.Arrays;

public class Matcher {

    public static int computeScore() {
        return 0; 
    }

    public static boolean ageMatch(double min, double max, double actual) {
        return (min < actual && actual < max);
    }

    public static boolean provinceMatch(String[] places, String destination) {
        return Arrays.asList(places).contains(destination);
    }
}