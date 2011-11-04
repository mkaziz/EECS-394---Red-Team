import android.app.Application;

public class password extends Application 
{
      private String mypassword = "";

      public String getpassword()
      {
        return mypassword;
      }//End method

      public void setpassword(String s)
      {
        mypassword = s;
      }//End method
}//End Class
