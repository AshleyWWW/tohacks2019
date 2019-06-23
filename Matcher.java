public class Matcher {
    
    private class Match {
        public boolean pass; 
        public boolean strict; // if true, failing this is a hard no
        public String message; 
    }

    public static double computeScore() {
        return 0.0; 
    }

    public static Match ageMatch() {
        return new Match(); 
    }

    public static Match provinceMatch() {
        return new Match(); 
    }
}