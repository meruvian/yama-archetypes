#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )

package ${package}.webapi.interceptor;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

import javax.ws.rs.NameBinding;


@NameBinding
@Retention(RetentionPolicy.RUNTIME)
public @interface DetectCurrentUser {

}
