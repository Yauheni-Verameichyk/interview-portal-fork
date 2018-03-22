package by.interview.portal.attribute_converter;

import java.io.Serializable;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.time.Period;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.usertype.UserType;
import org.postgresql.util.PGInterval;

public class Interval implements UserType {
    @Override
    public Object assemble(Serializable cached, Object owner) throws HibernateException {
        return cached;
    }

    @Override
    public Object deepCopy(Object value) throws HibernateException {
        return value;
    }

    @Override
    public Serializable disassemble(Object value) throws HibernateException {
        return (Serializable) value;
    }

    @Override
    public boolean equals(Object arg0, Object arg1) throws HibernateException {
        return arg0.equals(arg1);
    }

    @Override
    public int hashCode(Object object) throws HibernateException {
        return object.hashCode();
    }

    @Override
    public boolean isMutable() {
        return false;
    }

    @Override
    public Period nullSafeGet(ResultSet rs, String[] names,
            SharedSessionContractImplementor session, Object owner)
            throws HibernateException, SQLException {
        String interval = rs.getString(names[0]);
        if (rs.wasNull() || interval == null) {
            return null;
        }
        PGInterval pgInterval = new PGInterval(interval);
        return Period.of(pgInterval.getYears(), pgInterval.getMonths(), pgInterval.getDays());
    }

    public static String getInterval(Period attribute) {
        return new PGInterval(attribute.getYears(), attribute.getMonths(), attribute.getDays(), 0,
                0, 0).getValue();
    }

    @Override
    public void nullSafeSet(PreparedStatement st, Object value, int index,
            SharedSessionContractImplementor session) throws HibernateException, SQLException {
        if (value == null) {
            st.setNull(index, Types.VARCHAR);
        } else {
            st.setObject(index, getInterval(((Period) value)), Types.OTHER);
        }
    }

    @Override
    public Object replace(Object original, Object target, Object owner) throws HibernateException {
        return original;
    }

    @Override
    public Class<Period> returnedClass() {
        return Period.class;
    }

    @Override
    public int[] sqlTypes() {
        return new int[] {Types.OTHER};
    }
}
